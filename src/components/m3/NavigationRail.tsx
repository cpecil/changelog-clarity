import { motion } from "framer-motion";
import { Home, AlertCircle, Bell, Scale, Rss } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { cn } from "@/lib/utils";
import type { LucideIcon as LucideIconType } from "lucide-react";

interface NavigationRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems: { id: string; label: string; icon: LucideIconType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "alerts", label: "Alerts", icon: AlertCircle },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "legal", label: "Legal", icon: Scale },
];

export function NavigationRail({ activeTab, onTabChange }: NavigationRailProps) {
  return (
    <nav className="hidden md:flex md-nav-rail border-r border-md-outline-variant h-screen sticky top-0">
      {/* FAB area - Logo */}
      <div className="py-6 px-3">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="md-fab-small cursor-pointer"
          style={{ 
            background: 'hsl(var(--md-sys-color-primary-container))',
            color: 'hsl(var(--md-sys-color-on-primary-container))'
          }}
        >
          <LucideIcon icon={Rss} size="small" />
        </motion.div>
      </div>

      {/* Navigation destinations */}
      <div className="flex-1 flex flex-col items-center gap-0 py-6">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="md-nav-rail-item"
              data-active={isActive}
              aria-label={item.label}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="md-nav-rail-item-icon"
                animate={{
                  backgroundColor: isActive
                    ? "hsl(var(--md-sys-color-secondary-container))"
                    : "transparent",
                }}
                transition={{ 
                  duration: 0.2,
                  ease: [0.2, 0, 0, 1]
                }}
              >
                <LucideIcon 
                  icon={item.icon} 
                  size="small"
                  className={cn(
                    "transition-colors",
                    isActive 
                      ? "text-md-on-secondary-container" 
                      : "text-md-on-surface-variant"
                  )}
                />
              </motion.div>
              <span className={cn(
                "label-medium transition-colors",
                isActive 
                  ? "text-md-on-surface" 
                  : "text-md-on-surface-variant"
              )}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
