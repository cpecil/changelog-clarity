import { useState, useRef, useEffect } from "react";
import { Home, AlertCircle, Bell, MoreHorizontal, Share2, Cookie, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon as LucideIconType } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onShareClick?: () => void;
  onCookieSettingsClick?: () => void;
}

const mainItems: { id: string; label: string; icon: LucideIconType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "alerts", label: "Updates", icon: AlertCircle },
  { id: "notifications", label: "Subscribe", icon: Bell },
];

const moreItems: { id: string; label: string; icon: LucideIconType; action?: string }[] = [
  { id: "legal", label: "Legal", icon: Scale },
  { id: "share", label: "Share", icon: Share2, action: "share" },
  { id: "cookies", label: "Cookies", icon: Cookie, action: "cookies" },
];

export function BottomNavigation({ activeTab, onTabChange, onShareClick, onCookieSettingsClick }: BottomNavigationProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    if (moreOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  const isMoreActive = activeTab === "legal";

  return (
    <nav className="md:hidden md-nav-bar">
      <div className="flex items-center justify-around h-full px-2">
        {mainItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="md-nav-bar-item flex-1"
              data-active={isActive}
              aria-label={item.label}
            >
              <div className={cn("md-nav-bar-item-icon", isActive && "bg-md-secondary-container")}>
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-md-on-secondary-container" : "text-md-on-surface-variant")} />
              </div>
              <span className={cn("label-small transition-colors", isActive ? "text-md-on-surface" : "text-md-on-surface-variant")}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More button */}
        <div className="flex-1 relative" ref={menuRef}>
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="md-nav-bar-item w-full"
            data-active={isMoreActive}
            aria-label="More"
          >
            <div className={cn("md-nav-bar-item-icon", (isMoreActive || moreOpen) && "bg-md-secondary-container")}>
              <MoreHorizontal size={18} className={cn("transition-colors", isMoreActive ? "text-md-on-secondary-container" : "text-md-on-surface-variant")} />
            </div>
            <span className={cn("label-small transition-colors", isMoreActive ? "text-md-on-surface" : "text-md-on-surface-variant")}>
              More
            </span>
          </button>

          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full right-0 mb-2 w-48 rounded-m3-large overflow-hidden z-50"
                style={{
                  background: "hsl(var(--md-sys-color-surface-container))",
                  boxShadow: "var(--md-sys-elevation-level2)",
                }}
              >
                <div className="py-1">
                  {moreItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setMoreOpen(false);
                        if (item.action === "share") onShareClick?.();
                        else if (item.action === "cookies") onCookieSettingsClick?.();
                        else onTabChange(item.id);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-md-surface-variant transition-colors"
                    >
                      <item.icon size={18} className="text-md-on-surface-variant" />
                      <span className="label-large text-md-on-surface">{item.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
