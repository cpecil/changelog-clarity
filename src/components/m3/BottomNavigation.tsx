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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-md-surface-container border-t border-md-outline-variant">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex flex-col items-center justify-center gap-1 w-20 py-2"
              aria-label={item.label}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-16 h-8 rounded-m3-full transition-colors",
                  isActive ? "bg-md-secondary-container" : "transparent"
                )}
              >
                <LucideIcon
                  icon={item.icon}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-md-on-secondary-container" : "text-md-on-surface-variant"
                  )}
                />
              </div>
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
