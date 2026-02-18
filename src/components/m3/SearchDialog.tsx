import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { ChangelogEntry } from "@/types/changelog";
import { cookies } from "@/lib/cookies";
import { useLunrSearch } from "@/hooks/use-lunr-search";

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
      <mark
        className="rounded-sm px-0.5"
        style={{
          background: "hsl(var(--md-sys-color-primary) / 0.2)",
          color: "hsl(var(--md-sys-color-on-surface))",
        }}
      >
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const categoryLabel: Record<string, string> = {
  feature: "Feature",
  improvement: "Update",
  bugfix: "Fix",
  security: "Security",
  breaking: "Breaking",
};

export function SearchDialog({ isOpen, onClose, entries, onSelectEntry }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { search } = useLunrSearch(entries);

  useEffect(() => {
    if (isOpen) setRecentSearches(cookies.getSearchHistory());
  }, [isOpen]);

  // Lunr.js powered search
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return search(query);
  }, [query, search]);

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
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelect = (entry: ChangelogEntry) => {
    if (query.trim()) cookies.addSearchQuery(query.trim());
    cookies.setLastRead(entry.id);
    onSelectEntry?.(entry);
    onClose();
  };

  const handleRecentClick = (q: string) => {
    setQuery(q);
    setSelectedIndex(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* M3 Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60]"
            style={{ background: "hsl(var(--md-sys-color-scrim) / 0.32)" }}
          />

          {/* M3 Search Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.2, 0, 0, 1] }}
            className="fixed inset-x-4 top-[10%] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-[60]"
          >
            <div
              className="overflow-hidden"
              style={{
                background: "hsl(var(--md-sys-color-surface-container-high))",
                borderRadius: "var(--md-sys-shape-corner-extra-large)",
                boxShadow: "var(--md-sys-elevation-level3)",
              }}
            >
              {/* M3 Search Bar */}
              <div
                className="flex items-center gap-3 px-5 h-14"
                style={{
                  borderBottom: "1px solid hsl(var(--md-sys-color-outline-variant) / 0.4)",
                }}
              >
                <Search
                  size={20}
                  style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                  className="shrink-0"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search versions, features, changes…"
                  className="flex-1 bg-transparent body-large focus:outline-none min-w-0"
                  style={{
                    color: "hsl(var(--md-sys-color-on-surface))",
                  }}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="md-icon-button w-8 h-8"
                  >
                    <X size={16} />
                  </button>
                )}
                <button onClick={onClose} className="md-icon-button w-8 h-8">
                  <X size={18} />
                </button>
              </div>

              {/* Results area */}
              <div className="max-h-[min(55vh,420px)] overflow-y-auto">
                {query.trim() && results.length === 0 ? (
                  <div className="p-8 text-center">
                    <p
                      className="body-medium"
                      style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                    >
                      No results for "{query}"
                    </p>
                    <p
                      className="body-small mt-1"
                      style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                    >
                      Try searching by version, feature name, or date
                    </p>
                  </div>
                ) : query.trim() ? (
                  <div className="py-1">
                    <p
                      className="px-5 py-2 label-small"
                      style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                    >
                      {results.length} result{results.length !== 1 ? "s" : ""} · Powered by Lunr.js
                    </p>
                    {results.slice(0, 10).map((r, i) => (
                      <button
                        key={r.entry.id}
                        onClick={() => handleSelect(r.entry)}
                        className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors"
                        style={{
                          background:
                            i === selectedIndex
                              ? "hsl(var(--md-sys-color-secondary-container))"
                              : undefined,
                        }}
                        onMouseEnter={() => setSelectedIndex(i)}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background: "hsl(var(--md-sys-color-surface-container))",
                          }}
                        >
                          <FileText
                            size={18}
                            style={{
                              color: "hsl(var(--md-sys-color-on-surface-variant))",
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="title-small truncate" style={{ color: "hsl(var(--md-sys-color-on-surface))" }}>
                            {highlightMatch(r.entry.summary, query)}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className="label-small"
                              style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                            >
                              {r.entry.version}
                            </span>
                            <span
                              className="w-1 h-1 rounded-full"
                              style={{ background: "hsl(var(--md-sys-color-outline-variant))" }}
                            />
                            <span
                              className="label-small"
                              style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                            >
                              {categoryLabel[r.entry.category || ""] || "Update"}
                            </span>
                            {r.matchFields.length > 0 && (
                              <>
                                <span
                                  className="w-1 h-1 rounded-full"
                                  style={{ background: "hsl(var(--md-sys-color-outline-variant))" }}
                                />
                                <span
                                  className="label-small"
                                  style={{ color: "hsl(var(--md-sys-color-primary))" }}
                                >
                                  {r.matchFields.slice(0, 2).join(", ")}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        {i === selectedIndex && (
                          <ArrowRight
                            size={16}
                            style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                            className="shrink-0"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 space-y-4">
                    {recentSearches.length > 0 && (
                      <div>
                        <p
                          className="label-small flex items-center gap-1.5 mb-2"
                          style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                        >
                          <Clock size={12} /> Recent
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
                    <div>
                      <p
                        className="label-small flex items-center gap-1.5 mb-2"
                        style={{ color: "hsl(var(--md-sys-color-on-surface-variant))" }}
                      >
                        <TrendingUp size={12} /> Suggestions
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {["dark mode", "security", "2.5.0", "performance", "breaking"].map(
                          (s) => (
                            <button
                              key={s}
                              onClick={() => handleRecentClick(s)}
                              className="md-chip"
                            >
                              {s}
                            </button>
                          )
                        )}
                      </div>
                    </div>
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
