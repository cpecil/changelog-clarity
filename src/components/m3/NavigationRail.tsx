import { motion } from "framer-motion";
import { Home, AlertCircle, Bell, Scale, Rss } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon as LucideIconType } from "lucide-react";

interface NavigationRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems: { id: string; label: string; icon: LucideIconType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "alerts", label: "Updates", icon: AlertCircle },
  { id: "notifications", label: "Subscribe", icon: Bell },
  { id: "legal", label: "Legal", icon: Scale },
];

export function NavigationRail({ activeTab, onTabChange }: NavigationRailProps) {
  return (
    <nav className="hidden md:flex md-nav-rail border-r border-md-outline-variant h-screen sticky top-0">
      {/* Logo */}
      <div className="py-5 px-3">
        <div
          className="w-10 h-10 rounded-m3-medium flex items-center justify-center"
          style={{
            background: 'hsl(var(--md-sys-color-primary-container))',
            color: 'hsl(var(--md-sys-color-on-primary-container))'
          }}
        >
          <Rss className="w-[18px] h-[18px]" />
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 flex flex-col items-center gap-1 py-4">
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
              <div
                className={cn(
                  "md-nav-rail-item-icon",
                  isActive && "bg-md-secondary-container"
                )}
              >
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
