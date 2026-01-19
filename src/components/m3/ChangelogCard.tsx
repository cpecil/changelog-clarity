import { motion } from "framer-motion";
import { ChangelogEntry, ChangeType } from "@/types/changelog";
import { StatusChip } from "./StatusChip";
import { MaterialIcon } from "./MaterialIcon";
import { cn } from "@/lib/utils";

interface ChangelogCardProps {
  entry: ChangelogEntry;
  index: number;
  onClick?: () => void;
}

const typeConfig: Record<ChangeType, { icon: string; color: string; label: string }> = {
  Added: { icon: "add_circle", color: "text-status-complete", label: "New" },
  Improved: { icon: "arrow_upward", color: "text-md-primary", label: "Improved" },
  Fixed: { icon: "build", color: "text-status-planned", label: "Fixed" },
};

export function ChangelogCard({ entry, index, onClick }: ChangelogCardProps) {
  const formattedDate = new Date(entry.release_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
      onClick={onClick}
    >
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

        {/* Summary */}
        <h3 className="title-large text-md-on-surface mb-4">{entry.summary}</h3>

        {/* Changes list */}
        <ul className="space-y-3 mb-4">
          {entry.changes.slice(0, 3).map((change, i) => {
            const config = typeConfig[change.type];
            return (
              <li key={i} className="flex items-start gap-3">
                <MaterialIcon
                  name={config.icon}
                  size="small"
                  className={cn("flex-shrink-0 mt-0.5", config.color)}
                />
                <span className="body-medium text-md-on-surface-variant">
                  {change.text}
                </span>
              </li>
            );
          })}
          {entry.changes.length > 3 && (
            <li className="flex items-center gap-3 body-medium text-md-on-surface-variant">
              <MaterialIcon name="more_horiz" size="small" className="text-md-on-surface-variant" />
              <span>+{entry.changes.length - 3} more changes</span>
            </li>
          )}
        </ul>

        {/* Footer with links */}
        {entry.links && entry.links.length > 0 && (
          <div className="flex items-center gap-4 pt-4 border-t border-md-outline-variant">
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
                <MaterialIcon name="open_in_new" size="small" />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
