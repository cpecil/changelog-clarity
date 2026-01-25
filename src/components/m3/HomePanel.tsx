import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bell, Zap, History, Shield } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { changelogEntries } from "@/data/changelog-data";
import { TimelineEntry } from "./TimelineEntry";

interface HomePanelProps {
  onNavigate: (tab: string) => void;
}

export function HomePanel({ onNavigate }: HomePanelProps) {
  const latestEntries = changelogEntries.slice(0, 3);
  
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        {/* Hero Section */}
        <div className="text-center py-6 md:py-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-m3-full bg-md-primary-container text-md-on-primary-container mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="label-large">What's New</span>
          </motion.div>
          
          <h1 className="display-large text-md-on-surface mb-4">
            Changelog
          </h1>
          <p className="body-large text-md-on-surface-variant max-w-xl mx-auto mb-8">
            New features, improvements, and bug fixes. Stay up to date with everything that's happening.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("alerts")}
              className="md-filled-button"
            >
              View All Updates
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate("notifications")}
              className="md-outlined-button"
            >
              <Bell className="w-4 h-4" />
              Subscribe
            </motion.button>
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="md-card-outlined p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-m3-medium bg-md-primary-container flex items-center justify-center">
              <Zap className="w-5 h-5 text-md-on-primary-container" />
            </div>
            <p className="headline-small text-md-primary mb-1">{changelogEntries.length}</p>
            <p className="label-medium text-md-on-surface-variant">Updates</p>
          </div>
          <div className="md-card-outlined p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-m3-medium bg-status-complete/10 flex items-center justify-center">
              <History className="w-5 h-5 text-status-complete" />
            </div>
            <p className="headline-small text-status-complete mb-1">
              {changelogEntries.filter(e => e.status === "Complete").length}
            </p>
            <p className="label-medium text-md-on-surface-variant">Released</p>
          </div>
          <div className="md-card-outlined p-5 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-m3-medium bg-status-rolling/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-status-rolling" />
            </div>
            <p className="headline-small text-status-rolling mb-1">
              {changelogEntries.filter(e => e.status === "Rolling out").length}
            </p>
            <p className="label-medium text-md-on-surface-variant">In Progress</p>
          </div>
        </motion.div>

        {/* Latest Updates - Timeline Style */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="headline-medium text-md-on-surface">Recent Updates</h2>
            <button 
              onClick={() => onNavigate("alerts")}
              className="md-text-button"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="timeline-container">
            <div className="timeline-line" />
            <div className="space-y-0">
              {latestEntries.map((entry, index) => (
                <TimelineEntry 
                  key={entry.id} 
                  entry={entry} 
                  index={index} 
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
