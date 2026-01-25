import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ChangelogEntry, ChangeType } from "@/types/changelog";
import { cn } from "@/lib/utils";

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
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.2, 0, 0, 1],
      }}
      className="timeline-entry group"
    >
      {/* Date column - Desktop */}
      <div className="hidden md:block">
        <div className="sticky top-20">
          <span className="label-medium text-md-on-surface-variant">{formattedDate}</span>
        </div>
      </div>

      {/* Timeline dot */}
      <div className="timeline-dot" />

      {/* Content */}
      <div className="pb-10">
        {/* Mobile date */}
        <div className="md:hidden mb-3">
          <span className="label-medium text-md-on-surface-variant">{formattedDate}</span>
        </div>

        {/* Category & Version badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={categoryInfo.class}>
            {categoryInfo.label}
          </span>
          {entry.version && (
            <span 
              className="inline-flex items-center px-3 h-6 rounded-m3-small label-medium font-mono"
              style={{
                background: 'hsl(var(--md-sys-color-surface-container-high))',
                color: 'hsl(var(--md-sys-color-on-surface-variant))'
              }}
            >
              {entry.version}
            </span>
          )}
        </div>

        {/* Summary */}
        <p className="body-large text-md-on-surface leading-relaxed mb-4">
          {entry.summary}
        </p>

        {/* Changes list */}
        {entry.changes.length > 0 && (
          <div className="space-y-2 mb-4">
            {entry.changes.slice(0, 3).map((change, i) => (
              <div 
                key={i}
                className="flex items-start gap-3 body-medium"
              >
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
            {entry.changes.length > 3 && (
              <p className="body-small text-md-on-surface-variant pl-16">
                +{entry.changes.length - 3} more changes
              </p>
            )}
          </div>
        )}

        {/* Links */}
        {entry.links && entry.links.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 mt-4">
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
    </motion.article>
  );
}
