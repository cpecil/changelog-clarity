import { motion } from "framer-motion";
import { FileText, Bell, Download, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "changelog", label: "Updates", icon: FileText },
  { id: "subscribe", label: "Subscribe", icon: Bell },
  { id: "export", label: "Export", icon: Download },
  { id: "settings", label: "Settings", icon: Settings },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-md-surface-container border-t border-md-outline-variant">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center justify-center gap-1 w-16 py-2"
              aria-label={item.label}
            >
              <motion.div
                className={cn(
                  "flex items-center justify-center w-16 h-8 rounded-m3-full transition-colors",
                  isActive ? "bg-md-secondary-container" : "transparent"
                )}
                animate={{
                  scale: isActive ? 1 : 1,
                }}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-md-on-secondary-container" : "text-md-on-surface-variant"
                  )}
                />
              </motion.div>
              <span
                className={cn(
                  "label-medium transition-colors",
                  isActive ? "text-md-on-surface" : "text-md-on-surface-variant"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
