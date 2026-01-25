import { motion } from "framer-motion";
import { Home, AlertCircle, Bell, Scale } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { cn } from "@/lib/utils";
import type { LucideIcon as LucideIconType } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems: { id: string; label: string; icon: LucideIconType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "alerts", label: "Alerts", icon: AlertCircle },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "legal", label: "Legal", icon: Scale },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="md:hidden md-nav-bar">
      <div className="flex items-center justify-around h-full">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="md-nav-bar-item"
              data-active={isActive}
              aria-label={item.label}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="md-nav-bar-item-icon"
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
              <span
                className={cn(
                  "label-medium transition-colors",
                  isActive 
                    ? "text-md-on-surface" 
                    : "text-md-on-surface-variant"
                )}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
