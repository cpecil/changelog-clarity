import { motion } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { ChangelogEntry, ChangeType } from "@/types/changelog";
import { LucideIcon } from "./LucideIcon";
import { cn } from "@/lib/utils";

interface TimelineEntryProps {
  entry: ChangelogEntry;
  index: number;
}

const categoryConfig: Record<string, { label: string; class: string }> = {
  feature: { label: "Feature", class: "category-badge feature" },
  improvement: { label: "Update", class: "category-badge update" },
  bugfix: { label: "Fix", class: "category-badge fix" },
  security: { label: "Fix", class: "category-badge fix" },
  breaking: { label: "Announcement", class: "category-badge announcement" },
};

const changeTypeColors: Record<ChangeType, string> = {
  Added: "text-status-complete",
  Improved: "text-md-primary",
  Fixed: "text-status-planned",
};

export function TimelineEntry({ entry, index }: TimelineEntryProps) {
  const formattedDate = new Date(entry.release_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const categoryInfo = entry.category 
    ? categoryConfig[entry.category] 
    : { label: "Update", class: "category-badge update" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.2, 0, 0, 1],
      }}
      className="timeline-entry group"
    >
      {/* Date column */}
      <div className="hidden md:block">
        <div className="sticky top-20">
          <span className="label-medium text-md-on-surface-variant">{formattedDate}</span>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="timeline-dot" />

      {/* Content */}
      <div className="pb-8">
        {/* Mobile date */}
        <div className="md:hidden mb-2">
          <span className="label-medium text-md-on-surface-variant">{formattedDate}</span>
        </div>

        {/* Category & Version badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={categoryInfo.class}>
            {categoryInfo.label}
          </span>
          {entry.version && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-md-surface-container-high text-md-on-surface-variant label-medium font-mono">
              {entry.version}
            </span>
          )}
        </div>

        {/* Summary */}
        <p className="body-large text-md-on-surface leading-relaxed mb-3">
          {entry.summary}
          {entry.changes.length > 0 && (
            <span className="text-md-on-surface-variant">
              {" "}
              {entry.changes.slice(0, 2).map((change, i) => (
                <span key={i}>
                  {i > 0 && ", "}
                  <span className={cn("font-medium", changeTypeColors[change.type])}>
                    {change.text}
                  </span>
                </span>
              ))}
              {entry.changes.length > 2 && (
                <span className="text-md-on-surface-variant">
                  {" "}and {entry.changes.length - 2} more changes.
                </span>
              )}
            </span>
          )}
        </p>

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
              >
                {link.label}
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover/link:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
