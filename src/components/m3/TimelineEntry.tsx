import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Play, Volume2, Circle, CheckCircle2, Clock, Rocket } from "lucide-react";
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

const statusIcon: Record<string, typeof Circle> = {
  Complete: CheckCircle2,
  "Rolling out": Rocket,
  Planned: Clock,
};

const statusColor: Record<string, string> = {
  Complete: "--status-complete",
  "Rolling out": "--status-rolling",
  Planned: "--status-planned",
};

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const date = new Date(entry.release_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const cat = entry.category ? categoryConfig[entry.category] : { label: "Update", class: "category-badge update" };
  const StatusIcon = statusIcon[entry.status] || Circle;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.2, 0, 0, 1] }}
    >
      <div className="md-update-card">
        {/* ===== COLLAPSED VIEW: Rounded card with image, title, category, date ===== */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left focus:outline-none group"
        >
          {/* Header image - rounded top */}
          {entry.header_image && (
            <div className="relative h-32 sm:h-40 overflow-hidden rounded-t-[28px]">
              <img
                src={entry.header_image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Version floating badge */}
              {entry.version && (
                <span className="absolute top-3 right-3 md-version-badge backdrop-blur-sm bg-white/80 dark:bg-black/60">
                  {entry.version}
                </span>
              )}
            </div>
          )}

          {/* Card body */}
          <div className="p-4 sm:p-5">
            {/* Title */}
            <h3 className="title-medium sm:title-large text-md-on-surface leading-snug mb-2">
              {entry.summary}
            </h3>

            {/* Meta row: category + date + chevron */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cat.class}>{cat.label}</span>
                <span className="label-small text-md-on-surface-variant">{date}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-md-surface-variant"
              >
                <ChevronDown className="w-4 h-4 text-md-on-surface-variant" />
              </motion.div>
            </div>
          </div>
        </button>

        {/* ===== EXPANDED VIEW: Status timeline with separate content boxes ===== */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-5 space-y-4">
                <div className="md-divider" />

                {/* Status indicator box */}
                <div className="md-content-box flex items-center gap-3">
                  <StatusIcon
                    className="w-5 h-5 shrink-0"
                    style={{ color: `hsl(var(${statusColor[entry.status] || "--status-complete"}))` }}
                  />
                  <div>
                    <p className="label-large text-md-on-surface">{entry.status}</p>
                    <p className="body-small text-md-on-surface-variant">{date}</p>
                  </div>
                  {entry.version && !entry.header_image && (
                    <span className="ml-auto md-version-badge">{entry.version}</span>
                  )}
                </div>

                {/* Changes timeline */}
                {entry.changes.length > 0 && (
                  <div className="md-content-box">
                    <p className="label-medium text-md-on-surface-variant mb-3">Changes</p>
                    <div className="relative pl-5 space-y-3">
                      {/* Timeline line */}
                      <div
                        className="absolute left-[7px] top-1 bottom-1 w-px"
                        style={{ background: 'hsl(var(--md-sys-color-outline-variant))' }}
                      />
                      {entry.changes.map((change, i) => (
                        <div key={i} className="flex items-start gap-3 relative">
                          {/* Timeline dot */}
                          <div
                            className="absolute -left-5 top-1.5 w-[9px] h-[9px] rounded-full border-2"
                            style={{
                              borderColor: change.type === "Added"
                                ? 'hsl(var(--status-complete))'
                                : change.type === "Improved"
                                  ? 'hsl(var(--md-sys-color-primary))'
                                  : 'hsl(var(--status-planned))',
                              background: 'hsl(var(--md-sys-color-surface-container))',
                            }}
                          />
                          <span className={cn(
                            "label-small px-1.5 py-0.5 rounded-m3-small shrink-0",
                            change.type === "Added" && "bg-status-complete/12 text-status-complete",
                            change.type === "Improved" && "bg-md-primary/12 text-md-primary",
                            change.type === "Fixed" && "bg-status-planned/12 text-status-planned"
                          )}>
                            {change.type}
                          </span>
                          <span className="body-small text-md-on-surface-variant">{change.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MDX content box */}
                {entry.detailed_info && (
                  <div className="md-content-box">
                    <div className="prose-changelog">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.detailed_info}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {/* Media grid */}
                {entry.media && entry.media.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {entry.media.map((item, i) => (
                      <div key={i} className="md-media-card">
                        {item.type === "image" && (
                          <img src={item.url} alt={item.alt || ""} className="w-full h-28 sm:h-36 object-cover rounded-m3-medium" loading="lazy" />
                        )}
                        {item.type === "video" && (
                          <div className="w-full h-28 sm:h-36 rounded-m3-medium bg-md-surface-container-highest flex items-center justify-center">
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
                {(entry.actions?.length || entry.links?.length) && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
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
                )}

                {/* View full entry */}
                <div className="pt-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/entry/${entry.id}`); }}
                    className="md-tonal-button"
                  >
                    View Full Details →
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
