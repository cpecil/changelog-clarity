import { motion } from "framer-motion";
import { ArrowRight, Bell, Zap, History, Sparkles } from "lucide-react";
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
    <div className="w-full max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="space-y-8 lg:space-y-12"
      >
        {/* Hero - compact */}
        <div className="text-center space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 h-7 rounded-m3-full label-medium"
            style={{
              background: 'hsl(var(--md-sys-color-primary-container))',
              color: 'hsl(var(--md-sys-color-on-primary-container))'
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            What's New
          </div>

          <h1 className="headline-large sm:display-small text-md-on-surface">Changelog</h1>
          <p className="body-medium sm:body-large text-md-on-surface-variant max-w-md mx-auto">
            New features, improvements, and fixes.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button onClick={() => onNavigate("alerts")} className="md-filled-button">
              View Updates <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate("notifications")} className="md-tonal-button">
              <Bell className="w-4 h-4" /> Subscribe
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Zap, value: totalUpdates, label: "Updates", color: "--md-sys-color-primary" },
            { icon: History, value: completedUpdates, label: "Released", color: "--status-complete" },
            { icon: Sparkles, value: rollingUpdates, label: "In Progress", color: "--status-rolling" },
          ].map((stat) => (
            <div key={stat.label} className="md-card-outlined p-4 text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-2" style={{ color: `hsl(var(${stat.color}))` }} />
              <p className="title-large" style={{ color: `hsl(var(${stat.color}))` }}>{stat.value}</p>
              <p className="label-small text-md-on-surface-variant">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Updates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="title-large text-md-on-surface">Recent</h2>
            <button onClick={() => onNavigate("alerts")} className="md-text-button">
              All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {latestEntries.map((entry, index) => (
              <TimelineEntry key={entry.id} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
