import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Play, Volume2 } from "lucide-react";
import { ChangelogEntry } from "@/types/changelog";
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

const statusDot: Record<string, string> = {
  Complete: "bg-status-complete",
  "Rolling out": "bg-status-rolling",
  Planned: "bg-status-planned",
};

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const date = new Date(entry.release_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const cat = entry.category ? categoryConfig[entry.category] : { label: "Update", class: "category-badge update" };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.2, 0, 0, 1] }}
    >
      <div className="md-update-card">
        {/* Header image */}
        {entry.header_image && (
          <div className="relative h-36 sm:h-44 lg:h-52 overflow-hidden">
            <img src={entry.header_image} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        {/* Clickable header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-4 sm:p-5 flex flex-col gap-2 group focus:outline-none"
        >
          {/* Meta row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="label-small text-md-on-surface-variant">{date}</span>
              <span className={cn("w-1.5 h-1.5 rounded-full", statusDot[entry.status] || "bg-status-complete")} />
              <span className="label-small text-md-on-surface-variant">{entry.status}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-md-surface-variant"
            >
              <ChevronDown className="w-4 h-4 text-md-on-surface-variant" />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="title-medium sm:title-large text-md-on-surface leading-snug">
            {entry.summary}
          </h3>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cat.class}>{cat.label}</span>
            {entry.version && <span className="md-version-badge">{entry.version}</span>}
          </div>
        </button>

        {/* Expandable content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4">
                <div className="md-divider" />

                {/* Changes */}
                {entry.changes.length > 0 && (
                  <div className="space-y-2">
                    {entry.changes.map((change, i) => (
                      <div key={i} className="flex items-start gap-2.5 body-small sm:body-medium">
                        <span className={cn(
                          "label-small px-1.5 py-0.5 rounded-m3-small shrink-0 mt-px",
                          change.type === "Added" && "bg-status-complete/12 text-status-complete",
                          change.type === "Improved" && "bg-md-primary/12 text-md-primary",
                          change.type === "Fixed" && "bg-status-planned/12 text-status-planned"
                        )}>
                          {change.type}
                        </span>
                        <span className="text-md-on-surface-variant">{change.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* MDX content */}
                {entry.detailed_info && (
                  <div className="md-content-box">
                    <div className="prose-changelog">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.detailed_info}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Media */}
                {entry.media && entry.media.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {entry.media.map((item, i) => (
                      <div key={i} className="md-media-card">
                        {item.type === "image" && (
                          <img src={item.url} alt={item.alt || ""} className="w-full h-32 sm:h-36 object-cover rounded-m3-medium" loading="lazy" />
                        )}
                        {item.type === "video" && (
                          <div className="w-full h-32 sm:h-36 rounded-m3-medium bg-md-surface-container-highest flex items-center justify-center">
                            <Play className="w-8 h-8 text-md-primary" />
                          </div>
                        )}
                        {item.type === "audio" && (
                          <div className="w-full h-14 rounded-m3-medium bg-md-surface-container-highest flex items-center gap-3 px-3">
                            <Volume2 className="w-4 h-4 text-md-primary shrink-0" />
                            <div className="flex-1 h-1 rounded-full bg-md-outline-variant">
                              <div className="w-1/3 h-full rounded-full bg-md-primary" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions & Links */}
                <div className="flex flex-wrap items-center gap-2">
                  {entry.actions?.map((action, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); action.onClick?.(); }}
                      className={action.variant === "filled" ? "md-filled-button" : "md-outlined-button"}
                    >
                      {action.label}
                    </button>
                  ))}
                  {entry.links?.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="inline-flex items-center gap-1 label-large text-md-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
