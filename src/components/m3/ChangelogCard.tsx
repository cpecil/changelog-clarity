import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusCircle, ArrowUp, Wrench, MoreHorizontal, ExternalLink, 
  ChevronDown, ChevronUp, Image as ImageIcon, Video, Music, FileText 
} from "lucide-react";
import { ChangelogEntry, ChangeType } from "@/types/changelog";
import { StatusChip } from "./StatusChip";
import { LucideIcon } from "./LucideIcon";
import { cn } from "@/lib/utils";
import type { LucideIcon as LucideIconType } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChangelogCardProps {
  entry: ChangelogEntry;
  index: number;
  onClick?: () => void;
}

const typeConfig: Record<ChangeType, { icon: LucideIconType; color: string; label: string }> = {
  Added: { icon: PlusCircle, color: "text-status-complete", label: "New" },
  Improved: { icon: ArrowUp, color: "text-md-primary", label: "Improved" },
  Fixed: { icon: Wrench, color: "text-status-planned", label: "Fixed" },
};

export function ChangelogCard({ entry, index, onClick }: ChangelogCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(entry.release_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Check if entry has extended content
  const hasDetailedInfo = entry.detailed_info && entry.detailed_info.trim().length > 0;
  const hasMedia = entry.media && entry.media.length > 0;
  const hasExtendedContent = hasDetailedInfo || hasMedia;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.2, 0, 0, 1],
      }}
      className="md-card-elevated overflow-hidden group"
    >
      {/* Header Image (if provided) */}
      {entry.header_image && (
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-md-primary to-md-tertiary">
          <img
            src={entry.header_image}
            alt={entry.summary}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Progress bar */}
      <div className="h-1 bg-md-surface-variant">
        <motion.div
          className={cn(
            "h-full",
            entry.status === "Planned" && "bg-status-planned",
            entry.status === "Rolling out" && "bg-status-rolling",
            entry.status === "Complete" && "bg-status-complete"
          )}
          initial={{ width: 0 }}
          animate={{
            width:
              entry.status === "Planned"
                ? "20%"
                : entry.status === "Rolling out"
                ? "60%"
                : "100%",
          }}
          transition={{ duration: 0.6, delay: index * 0.08 + 0.2 }}
        />
      </div>

      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="title-medium text-md-primary">{entry.version}</span>
            <span className="body-medium text-md-on-surface-variant">{formattedDate}</span>
          </div>
          <StatusChip status={entry.status} />
        </div>

        {/* Category Badge (if provided) */}
        {entry.category && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-md-primary-container text-md-on-primary-container">
              {entry.category === 'feature' && '✨'}
              {entry.category === 'bugfix' && '🐛'}
              {entry.category === 'security' && '🔒'}
              {entry.category === 'improvement' && '⚡'}
              {entry.category === 'breaking' && '💥'}
              <span className="capitalize">{entry.category}</span>
            </span>
          </div>
        )}

        {/* Summary */}
        <h3 className="title-large text-md-on-surface mb-4">{entry.summary}</h3>

        {/* Changes list */}
        <ul className="space-y-3 mb-4">
          {entry.changes.slice(0, 3).map((change, i) => {
            const config = typeConfig[change.type];
            return (
              <li key={i} className="flex items-start gap-3">
                <LucideIcon
                  icon={config.icon}
                  size="small"
                  className={cn("flex-shrink-0 mt-0.5", config.color)}
                />
                <span className="body-medium text-md-on-surface-variant">
                  {change.text}
                </span>
              </li>
            );
          })}
          {entry.changes.length > 3 && !isExpanded && (
            <li className="flex items-center gap-3 body-medium text-md-on-surface-variant">
              <LucideIcon icon={MoreHorizontal} size="small" className="text-md-on-surface-variant" />
              <span>+{entry.changes.length - 3} more changes</span>
            </li>
          )}
          {isExpanded && entry.changes.slice(3).map((change, i) => {
            const config = typeConfig[change.type];
            return (
              <li key={i + 3} className="flex items-start gap-3">
                <LucideIcon
                  icon={config.icon}
                  size="small"
                  className={cn("flex-shrink-0 mt-0.5", config.color)}
                />
                <span className="body-medium text-md-on-surface-variant">
                  {change.text}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Action Buttons (if provided) */}
        {entry.actions && entry.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {entry.actions.map((action, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick?.();
                }}
                className={cn(
                  "md-outlined-button",
                  action.variant === "filled" && "md-filled-button"
                )}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        {/* Expandable Details Section */}
        {hasExtendedContent && (
          <div className="border-t border-md-outline-variant pt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between md-text-button"
            >
              <span className="label-large">
                {isExpanded ? 'Hide Details' : 'Show Details'}
              </span>
              <LucideIcon 
                icon={isExpanded ? ChevronUp : ChevronDown} 
                size="small" 
              />
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-6">
                    {/* Detailed Information (Markdown) */}
                    {hasDetailedInfo && (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <div className="flex items-center gap-2 mb-3">
                          <LucideIcon icon={FileText} size="small" className="text-md-primary" />
                          <h4 className="title-medium text-md-on-surface">Detailed Information</h4>
                        </div>
                        <div className="text-md-on-surface-variant body-medium">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {entry.detailed_info}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}

                    {/* Media Gallery */}
                    {hasMedia && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <LucideIcon icon={ImageIcon} size="small" className="text-md-primary" />
                          <h4 className="title-medium text-md-on-surface">Media</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {entry.media.map((item, idx) => (
                            <div key={idx} className="rounded-m3-medium overflow-hidden border border-md-outline-variant">
                              {item.type === 'image' && (
                                <img
                                  src={item.url}
                                  alt={item.alt || `Media ${idx + 1}`}
                                  className="w-full h-auto"
                                />
                              )}
                              {item.type === 'video' && (
                                <video
                                  controls
                                  className="w-full h-auto"
                                  src={item.url}
                                >
                                  Your browser does not support video.
                                </video>
                              )}
                              {item.type === 'audio' && (
                                <div className="p-4 bg-md-surface-variant">
                                  <LucideIcon icon={Music} className="mx-auto mb-2 text-md-on-surface-variant" />
                                  <audio controls className="w-full" src={item.url}>
                                    Your browser does not support audio.
                                  </audio>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Footer with links */}
        {entry.links && entry.links.length > 0 && (
          <div className="flex items-center gap-4 pt-4 border-t border-md-outline-variant mt-4">
            {entry.links.slice(0, 2).map((link, i) => (
              <a
                key={i}
                href={link.url}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 label-large text-md-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <LucideIcon icon={ExternalLink} size="small" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}