import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, ArrowRight } from "lucide-react";
import { ChangelogEntry } from "@/types/changelog";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  entries: ChangelogEntry[];
  onSelectEntry?: (entry: ChangelogEntry) => void;
}

export function SearchDialog({ isOpen, onClose, entries, onSelectEntry }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = entries.filter((e) => {
    const q = query.toLowerCase();
    return (
      e.version.toLowerCase().includes(q) ||
      e.summary.toLowerCase().includes(q) ||
      e.changes.some((c) => c.text.toLowerCase().includes(q))
    );
  });

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
        onSelectEntry?.(results[selectedIndex]);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, results, selectedIndex, onClose, onSelectEntry]);

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
            className="fixed inset-x-4 top-[12%] sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-50"
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
                  placeholder="Search updates…"
                  className="flex-1 bg-transparent body-large text-md-on-surface placeholder:text-md-on-surface-variant focus:outline-none min-w-0"
                />
                <button onClick={onClose} className="md-icon-button w-8 h-8">
                  <X size={18} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[min(50vh,360px)] overflow-y-auto">
                {query && results.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="body-medium text-md-on-surface-variant">No results</p>
                  </div>
                ) : query ? (
                  <div className="py-1">
                    {results.slice(0, 8).map((entry, i) => (
                      <button
                        key={entry.id}
                        onClick={() => { onSelectEntry?.(entry); onClose(); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          i === selectedIndex ? "bg-md-secondary-container" : "hover:bg-md-surface-variant"
                        }`}
                      >
                        <FileText size={18} className="text-md-on-surface-variant shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="title-small text-md-on-surface truncate">{entry.summary}</p>
                          <p className="label-small text-md-on-surface-variant">{entry.version}</p>
                        </div>
                        {i === selectedIndex && <ArrowRight size={16} className="text-md-on-surface-variant shrink-0" />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="label-small text-md-on-surface-variant">Type to search versions, features, or changes</p>
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
