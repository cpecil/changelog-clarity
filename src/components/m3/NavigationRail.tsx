import { motion } from "framer-motion";
import { FileText, Bell, Settings, Download, Rss } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "changelog", label: "Updates", icon: FileText },
  { id: "subscribe", label: "Subscribe", icon: Bell },
  { id: "export", label: "Export", icon: Download },
  { id: "settings", label: "Settings", icon: Settings },
];

export function NavigationRail({ activeTab, onTabChange }: NavigationRailProps) {
  return (
    <nav className="hidden md:flex md-nav-rail border-r border-md-outline-variant h-screen sticky top-0">
      {/* Logo area */}
      <div className="py-4 px-3">
        <div className="w-12 h-12 rounded-m3-large bg-md-primary-container flex items-center justify-center">
          <Rss className="w-6 h-6 text-md-on-primary-container" />
        </div>
      </div>

      {/* FAB area */}
      <div className="py-4 px-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md-fab"
          aria-label="New entry"
          onClick={() => onTabChange("editor")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.button>
      </div>

      {/* Navigation items */}
      <div className="flex-1 flex flex-col items-center gap-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="md-nav-rail-item"
              data-active={isActive}
              aria-label={item.label}
            >
              <motion.div
                className="md-nav-rail-item-icon"
                animate={{
                  backgroundColor: isActive
                    ? "hsl(var(--md-sys-color-secondary-container))"
                    : "transparent",
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className={cn(
                "label-medium",
                isActive ? "text-md-on-surface" : "text-md-on-surface-variant"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
