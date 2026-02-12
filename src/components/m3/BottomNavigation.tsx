import { Home, AlertCircle, Bell, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon as LucideIconType } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems: { id: string; label: string; icon: LucideIconType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "alerts", label: "Updates", icon: AlertCircle },
  { id: "notifications", label: "Subscribe", icon: Bell },
  { id: "legal", label: "Legal", icon: Scale },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <nav className="md:hidden md-nav-bar">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="md-nav-bar-item flex-1"
              data-active={isActive}
              aria-label={item.label}
            >
              <div className={cn(
                "md-nav-bar-item-icon",
                isActive && "bg-md-secondary-container"
              )}>
                <item.icon
                  size={18}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-md-on-secondary-container" : "text-md-on-surface-variant"
                  )}
                />
              </div>
              <span className={cn(
                "label-small transition-colors",
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
