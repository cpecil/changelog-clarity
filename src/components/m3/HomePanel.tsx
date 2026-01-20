import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bell, FileText } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { changelogEntries } from "@/data/changelog-data";
import { StatusChip } from "./StatusChip";

interface HomePanelProps {
  onNavigate: (tab: string) => void;
}

export function HomePanel({ onNavigate }: HomePanelProps) {
  // Get the latest 3 changelog entries
  const latestEntries = changelogEntries.slice(0, 3);
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Hero Section */}
        <div className="text-center py-8 md:py-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-m3-full bg-md-primary-container text-md-on-primary-container mb-6"
          >
            <LucideIcon icon={Sparkles} size="small" />
            <span className="label-large">What's New</span>
          </motion.div>
          
          <h1 className="display-large text-md-on-surface mb-4">
            Product Changelog
          </h1>
          <p className="body-large text-md-on-surface-variant max-w-2xl mx-auto mb-8">
            Stay up to date with all the latest features, improvements, and bug fixes. 
            We're constantly working to make your experience better.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("alerts")}
              className="md-filled-button"
            >
              <LucideIcon icon={FileText} size="small" />
              View All Updates
              <LucideIcon icon={ArrowRight} size="small" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("notifications")}
              className="md-outlined-button"
            >
              <LucideIcon icon={Bell} size="small" />
              Subscribe for Updates
            </motion.button>
          </div>
        </div>

        {/* Latest Updates Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="headline-medium text-md-on-surface">Latest Updates</h2>
            <button 
              onClick={() => onNavigate("alerts")}
              className="md-text-button"
            >
              View all
              <LucideIcon icon={ArrowRight} size="small" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {latestEntries.map((entry, index) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="md-card-elevated p-5 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onNavigate("alerts")}
              >
                {/* Version and Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="title-medium text-md-primary">{entry.version}</span>
                  <StatusChip status={entry.status} />
                </div>

                {/* Summary */}
                <h3 className="title-large text-md-on-surface mb-2 line-clamp-2 group-hover:text-md-primary transition-colors">
                  {entry.summary}
                </h3>

                {/* Date */}
                <p className="body-medium text-md-on-surface-variant">
                  {new Date(entry.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                {/* Changes count */}
                <div className="mt-4 pt-4 border-t border-md-outline-variant">
                  <span className="label-medium text-md-on-surface-variant">
                    {entry.changes.length} change{entry.changes.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 py-8"
        >
          <div className="text-center p-6 rounded-m3-large bg-md-surface-variant/50">
            <p className="display-small text-md-primary mb-1">{changelogEntries.length}</p>
            <p className="label-large text-md-on-surface-variant">Total Updates</p>
          </div>
          <div className="text-center p-6 rounded-m3-large bg-md-surface-variant/50">
            <p className="display-small text-md-primary mb-1">
              {changelogEntries.filter(e => e.status === "Complete").length}
            </p>
            <p className="label-large text-md-on-surface-variant">Completed</p>
          </div>
          <div className="text-center p-6 rounded-m3-large bg-md-surface-variant/50">
            <p className="display-small text-md-primary mb-1">
              {changelogEntries.filter(e => e.status === "Rolling out").length}
            </p>
            <p className="label-large text-md-on-surface-variant">Rolling Out</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
