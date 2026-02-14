import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { ChangelogEntry } from "@/types/changelog";
import { cookies } from "@/lib/cookies";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entries: ChangelogEntry[];
  onSelectEntry?: (entry: ChangelogEntry) => void;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-md-primary/20 text-md-on-surface rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchDialog({ isOpen, onClose, entries, onSelectEntry }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from cookies
  useEffect(() => {
    if (isOpen) {
      setRecentSearches(cookies.getSearchHistory());
    }
  }, [isOpen]);

  // Deep search across all fields
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    
    return entries
      .map(entry => {
        let score = 0;
        const matchFields: string[] = [];

        // Version match (highest priority)
        if (entry.version.toLowerCase().includes(q)) { score += 10; matchFields.push("version"); }
        
        // Summary/title match
        if (entry.summary.toLowerCase().includes(q)) { score += 8; matchFields.push("title"); }
        
        // Category match
        if (entry.category?.toLowerCase().includes(q)) { score += 6; matchFields.push("category"); }
        
        // Status match
        if (entry.status.toLowerCase().includes(q)) { score += 5; matchFields.push("status"); }
        
        // Changes text match
        const matchingChanges = entry.changes.filter(c => c.text.toLowerCase().includes(q));
        if (matchingChanges.length > 0) { score += 4 * matchingChanges.length; matchFields.push("changes"); }
        
        // Detailed info / markdown content match
        if (entry.detailed_info?.toLowerCase().includes(q)) { score += 3; matchFields.push("details"); }

        // Date match
        const dateStr = new Date(entry.release_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
        if (dateStr.toLowerCase().includes(q)) { score += 4; matchFields.push("date"); }

        // Links match
        if (entry.links?.some(l => l.label.toLowerCase().includes(q))) { score += 2; matchFields.push("links"); }

        return { entry, score, matchFields };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query, entries]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        handleSelect(results[selectedIndex].entry);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, results, selectedIndex, onClose, onSelectEntry]);

  const handleSelect = (entry: ChangelogEntry) => {
    // Save to search history cookie
    if (query.trim()) {
      cookies.addSearchQuery(query.trim());
    }
    cookies.setLastRead(entry.id);
    onSelectEntry?.(entry);
    onClose();
  };

  const handleRecentClick = (q: string) => {
    setQuery(q);
    setSelectedIndex(0);
  };

  const categoryLabel: Record<string, string> = {
    feature: "Feature",
    improvement: "Update",
    bugfix: "Fix",
    security: "Security",
    breaking: "Breaking",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-4 top-[10%] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-50"
          >
            <div
              className="overflow-hidden"
              style={{
                background: 'hsl(var(--md-sys-color-surface-container-high))',
                borderRadius: 'var(--md-sys-shape-corner-extra-large)',
                boxShadow: 'var(--md-sys-elevation-level3)',
              }}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 h-14 border-b" style={{ borderColor: 'hsl(var(--md-sys-color-outline-variant))' }}>
                <Search size={20} className="text-md-on-surface-variant shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  placeholder="Search versions, features, changes…"
                  className="flex-1 bg-transparent body-large text-md-on-surface placeholder:text-md-on-surface-variant focus:outline-none min-w-0"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="md-icon-button w-8 h-8">
                    <X size={16} />
                  </button>
                )}
                <button onClick={onClose} className="md-icon-button w-8 h-8">
                  <X size={18} />
                </button>
              </div>

              {/* Results / Recent / Empty */}
              <div className="max-h-[min(55vh,420px)] overflow-y-auto">
                {query.trim() && results.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="body-medium text-md-on-surface-variant">No results for "{query}"</p>
                    <p className="body-small text-md-on-surface-variant mt-1">Try searching by version, feature name, or date</p>
                  </div>
                ) : query.trim() ? (
                  <div className="py-1">
                    <p className="px-4 py-2 label-small text-md-on-surface-variant">
                      {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                    {results.slice(0, 10).map((r, i) => (
                      <button
                        key={r.entry.id}
                        onClick={() => handleSelect(r.entry)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          i === selectedIndex ? "bg-md-secondary-container" : "hover:bg-md-surface-variant"
                        }`}
                      >
                        <FileText size={18} className="text-md-on-surface-variant shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="title-small text-md-on-surface truncate">
                            {highlightMatch(r.entry.summary, query)}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="label-small text-md-on-surface-variant">{r.entry.version}</span>
                            <span className="w-1 h-1 rounded-full bg-md-outline-variant" />
                            <span className="label-small text-md-on-surface-variant">
                              {categoryLabel[r.entry.category || ''] || 'Update'}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-md-outline-variant" />
                            <span className="label-small text-md-on-surface-variant">
                              {r.matchFields.join(', ')}
                            </span>
                          </div>
                        </div>
                        {i === selectedIndex && <ArrowRight size={16} className="text-md-on-surface-variant shrink-0" />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {/* Recent searches */}
                    {recentSearches.length > 0 && (
                      <div>
                        <p className="label-small text-md-on-surface-variant flex items-center gap-1.5 mb-2">
                          <Clock size={12} /> Recent searches
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {recentSearches.map((q) => (
                            <button
                              key={q}
                              onClick={() => handleRecentClick(q)}
                              className="md-chip"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick suggestions */}
                    <div>
                      <p className="label-small text-md-on-surface-variant flex items-center gap-1.5 mb-2">
                        <TrendingUp size={12} /> Try searching
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["dark mode", "security", "2.5.0", "performance", "breaking"].map((s) => (
                          <button
                            key={s}
                            onClick={() => handleRecentClick(s)}
                            className="md-chip"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="label-small text-md-on-surface-variant text-center pt-2">
                      Search across versions, features, dates, and content
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
