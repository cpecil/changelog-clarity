import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SearchX, FileText, ArrowRight, Keyboard, CornerDownLeft } from "lucide-react";
import { ChangelogEntry } from "@/types/changelog";
import { StatusChip } from "./StatusChip";
import { LucideIcon } from "./LucideIcon";

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

  const filteredEntries = entries.filter((entry) => {
    const searchLower = query.toLowerCase();
    return (
      entry.version.toLowerCase().includes(searchLower) ||
      entry.summary.toLowerCase().includes(searchLower) ||
      entry.changes.some((c) => c.text.toLowerCase().includes(searchLower))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filteredEntries.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filteredEntries[selectedIndex]) {
        onSelectEntry?.(filteredEntries[selectedIndex]);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredEntries, selectedIndex, onClose, onSelectEntry]);

  // Global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-[15%] z-50 w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="md-card-elevated overflow-hidden bg-md-surface-container">
              {/* Search input */}
              <div className="flex items-center gap-3 p-4 border-b border-md-outline-variant">
                <LucideIcon icon={Search} className="text-md-on-surface-variant" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Search updates..."
                  className="flex-1 bg-transparent body-large text-md-on-surface placeholder:text-md-on-surface-variant focus:outline-none"
                />
                <div className="flex items-center gap-1 px-2 py-1 rounded-m3-small bg-md-surface-variant">
                  <span className="label-small text-md-on-surface-variant">ESC</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {query && filteredEntries.length === 0 ? (
                  <div className="p-8 text-center">
                    <LucideIcon icon={SearchX} size="large" className="text-md-on-surface-variant mb-2 mx-auto" />
                    <p className="body-large text-md-on-surface-variant">No results found</p>
                  </div>
                ) : query ? (
                  <div className="py-2">
                    {filteredEntries.map((entry, index) => (
                      <button
                        key={entry.id}
                        onClick={() => {
                          onSelectEntry?.(entry);
                          onClose();
                        }}
                        className={`w-full flex items-start gap-4 p-4 text-left transition-colors ${
                          index === selectedIndex
                            ? "bg-md-secondary-container"
                            : "hover:bg-md-on-surface/[0.08]"
                        }`}
                      >
                        <LucideIcon
                          icon={FileText}
                          className={index === selectedIndex ? "text-md-on-secondary-container" : "text-md-on-surface-variant"}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="title-medium text-md-on-surface">{entry.version}</span>
                            <StatusChip status={entry.status} size="small" />
                          </div>
                          <p className="body-medium text-md-on-surface-variant truncate">
                            {entry.summary}
                          </p>
                        </div>
                        <LucideIcon
                          icon={ArrowRight}
                          size="small"
                          className={`flex-shrink-0 ${
                            index === selectedIndex ? "text-md-on-secondary-container" : "text-md-on-surface-variant opacity-0"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="label-medium text-md-on-surface-variant mb-3">Quick tips</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 body-medium text-md-on-surface-variant">
                        <LucideIcon icon={Keyboard} size="small" />
                        <span>Use arrow keys to navigate</span>
                      </div>
                      <div className="flex items-center gap-3 body-medium text-md-on-surface-variant">
                        <LucideIcon icon={CornerDownLeft} size="small" />
                        <span>Press Enter to select</span>
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
