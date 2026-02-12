import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Play, Image as ImageIcon, Volume2 } from "lucide-react";
import { ChangelogEntry, ChangeType } from "@/types/changelog";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TimelineEntryProps {
  entry: ChangelogEntry;
  index: number;
}

const categoryConfig: Record<string, { label: string; class: string }> = {
  feature: { label: "Feature", class: "category-badge feature" },
  improvement: { label: "Update", class: "category-badge update" },
  bugfix: { label: "Fix", class: "category-badge fix" },
  security: { label: "Security", class: "category-badge fix" },
  breaking: { label: "Breaking", class: "category-badge announcement" },
};

const statusConfig: Record<string, { color: string }> = {
  Complete: { color: "bg-status-complete" },
  "Rolling out": { color: "bg-status-rolling" },
  Planned: { color: "bg-status-planned" },
};

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = new Date(entry.release_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const categoryInfo = entry.category
    ? categoryConfig[entry.category]
    : { label: "Update", class: "category-badge update" };

  const statusInfo = statusConfig[entry.status] || { color: "bg-status-complete" };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.2, 0, 0, 1],
      }}
      className="mb-4"
    >
      <div className="md-update-card">
        {/* Header Image */}
        {entry.header_image && (
          <div className="md-update-card-image">
            <img
              src={entry.header_image}
              alt={entry.summary}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Card Header - Always visible, clickable */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-5 md:p-6 flex flex-col gap-3 group focus:outline-none"
        >
          {/* Top row: date, status, chevron */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="label-medium text-md-on-surface-variant">{formattedDate}</span>
              <div className="flex items-center gap-1.5">
                <span className={cn("w-2 h-2 rounded-full", statusInfo.color)} />
                <span className="label-small text-md-on-surface-variant">{entry.status}</span>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
              className="md-icon-button w-8 h-8 shrink-0"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="title-large text-md-on-surface group-hover:text-md-primary transition-colors">
            {entry.summary}
          </h3>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={categoryInfo.class}>{categoryInfo.label}</span>
            {entry.version && (
              <span className="md-version-badge">{entry.version}</span>
            )}
          </div>

          {/* Preview: first 2 changes */}
          {!isOpen && entry.changes.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {entry.changes.slice(0, 2).map((change, i) => (
                <span
                  key={i}
                  className={cn(
                    "label-small px-2 py-0.5 rounded-m3-small",
                    change.type === "Added" && "bg-status-complete/15 text-status-complete",
                    change.type === "Improved" && "bg-md-primary/15 text-md-primary",
                    change.type === "Fixed" && "bg-status-planned/15 text-status-planned"
                  )}
                >
                  {change.type}: {change.text.slice(0, 40)}{change.text.length > 40 ? "…" : ""}
                </span>
              ))}
              {entry.changes.length > 2 && (
                <span className="label-small text-md-on-surface-variant">
                  +{entry.changes.length - 2} more
                </span>
              )}
            </div>
          )}
        </button>

        {/* Collapsible Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-5">
                {/* Divider */}
                <div className="md-divider" />

                {/* All Changes */}
                {entry.changes.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="title-small text-md-on-surface">Changes</h4>
                    {entry.changes.map((change, i) => (
                      <div key={i} className="flex items-start gap-3 body-medium">
                        <span
                          className={cn(
                            "label-small px-2 py-0.5 rounded-m3-small shrink-0 mt-0.5",
                            change.type === "Added" && "bg-status-complete/15 text-status-complete",
                            change.type === "Improved" && "bg-md-primary/15 text-md-primary",
                            change.type === "Fixed" && "bg-status-planned/15 text-status-planned"
                          )}
                        >
                          {change.type}
                        </span>
                        <span className="text-md-on-surface-variant">{change.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* MDX / Detailed Info */}
                {entry.detailed_info && (
                  <div className="md-content-box">
                    <div className="prose-changelog">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {entry.detailed_info}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Media Gallery */}
                {entry.media && entry.media.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="title-small text-md-on-surface">Media</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {entry.media.map((item, i) => (
                        <div key={i} className="md-media-card">
                          {item.type === "image" && (
                            <img
                              src={item.url}
                              alt={item.alt || "Media"}
                              className="w-full h-40 object-cover rounded-m3-medium"
                              loading="lazy"
                            />
                          )}
                          {item.type === "video" && (
                            <div className="w-full h-40 rounded-m3-medium bg-md-surface-container-highest flex items-center justify-center">
                              <Play className="w-10 h-10 text-md-primary" />
                            </div>
                          )}
                          {item.type === "audio" && (
                            <div className="w-full h-16 rounded-m3-medium bg-md-surface-container-highest flex items-center gap-3 px-4">
                              <Volume2 className="w-5 h-5 text-md-primary shrink-0" />
                              <div className="flex-1 h-1 rounded-full bg-md-outline-variant">
                                <div className="w-1/3 h-full rounded-full bg-md-primary" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {entry.actions && entry.actions.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {entry.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick?.();
                        }}
                        className={
                          action.variant === "filled"
                            ? "md-filled-button"
                            : "md-outlined-button"
                        }
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Links */}
                {entry.links && entry.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-4">
                    {entry.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        className="inline-flex items-center gap-1.5 label-large text-md-primary hover:underline group/link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {link.label}
                        <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
