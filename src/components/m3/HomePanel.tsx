import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bell, Zap, History, TrendingUp } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { changelogEntries } from "@/data/changelog-data";
import { TimelineEntry } from "./TimelineEntry";

interface HomePanelProps {
  onNavigate: (tab: string) => void;
}

export function HomePanel({ onNavigate }: HomePanelProps) {
  const latestEntries = changelogEntries.slice(0, 3);
  const totalUpdates = changelogEntries.length;
  const completedUpdates = changelogEntries.filter(e => e.status === "Complete").length;
  const rollingUpdates = changelogEntries.filter(e => e.status === "Rolling out").length;
  
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="space-y-12"
      >
        {/* Hero Section */}
        <div className="text-center py-8 md:py-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, ease: [0.2, 0, 0, 1] }}
            className="inline-flex items-center gap-2 px-4 h-8 rounded-m3-full mb-8"
            style={{
              background: 'hsl(var(--md-sys-color-primary-container))',
              color: 'hsl(var(--md-sys-color-on-primary-container))'
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="label-large">What's New</span>
          </motion.div>
          
          <h1 className="display-medium md:display-large text-md-on-surface mb-4">
            Changelog
          </h1>
          <p className="body-large text-md-on-surface-variant max-w-xl mx-auto mb-10">
            New features, improvements, and bug fixes. Stay up to date with everything that's happening.
          </p>

          {/* Action Buttons - M3 Button spec */}
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
              className="md-tonal-button"
            >
              <Bell className="w-4 h-4" />
              Subscribe
            </motion.button>
          </div>
        </div>

        {/* Quick Stats - M3 Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: [0.2, 0, 0, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <div className="md-card-outlined p-6">
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-m3-medium flex items-center justify-center"
                style={{ background: 'hsl(var(--md-sys-color-primary-container))' }}
              >
                <Zap className="w-6 h-6 text-md-on-primary-container" />
              </div>
              <TrendingUp className="w-5 h-5 text-md-on-surface-variant" />
            </div>
            <p className="headline-large text-md-primary mb-1">{totalUpdates}</p>
            <p className="body-medium text-md-on-surface-variant">Total Updates</p>
          </div>
          
          <div className="md-card-outlined p-6">
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-m3-medium flex items-center justify-center"
                style={{ background: 'hsl(var(--status-complete) / 0.15)' }}
              >
                <History className="w-6 h-6 text-status-complete" />
              </div>
            </div>
            <p className="headline-large text-status-complete mb-1">{completedUpdates}</p>
            <p className="body-medium text-md-on-surface-variant">Released</p>
          </div>
          
          <div className="md-card-outlined p-6">
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-12 h-12 rounded-m3-medium flex items-center justify-center"
                style={{ background: 'hsl(var(--status-rolling) / 0.15)' }}
              >
                <Sparkles className="w-6 h-6 text-status-rolling" />
              </div>
            </div>
            <p className="headline-large text-status-rolling mb-1">{rollingUpdates}</p>
            <p className="body-medium text-md-on-surface-variant">In Progress</p>
          </div>
        </motion.div>

        {/* Recent Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: [0.2, 0, 0, 1] }}
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
}
