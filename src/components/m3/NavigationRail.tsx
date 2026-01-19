import { motion } from "framer-motion";
import { MaterialIcon } from "./MaterialIcon";
import { cn } from "@/lib/utils";

interface NavigationRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "changelog", label: "Updates", icon: "article" },
  { id: "subscribe", label: "Subscribe", icon: "notifications" },
];

export function NavigationRail({ activeTab, onTabChange }: NavigationRailProps) {
  return (
    <nav className="hidden md:flex md-nav-rail border-r border-md-outline-variant h-screen sticky top-0">
      {/* Logo area */}
      <div className="py-4 px-3">
        <div className="w-12 h-12 rounded-m3-large bg-md-primary-container flex items-center justify-center">
          <MaterialIcon name="rss_feed" className="text-md-on-primary-container" />
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex-1 flex flex-col items-center gap-1 py-4 mt-4">
        {navItems.map((item) => {
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
                <MaterialIcon 
                  name={item.icon} 
                  filled={isActive}
                  className={isActive ? "text-md-on-secondary-container" : "text-md-on-surface-variant"}
                />
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
