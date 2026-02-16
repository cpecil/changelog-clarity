import { useState, useRef, useEffect } from "react";
import { Home, AlertCircle, Bell, Scale, Rss, MoreVertical, Share2, Cookie } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { LucideIcon as LucideIconType } from "lucide-react";

interface NavigationRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onShareClick?: () => void;
  onCookieSettingsClick?: () => void;
}

const mainItems: { id: string; label: string; icon: LucideIconType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "alerts", label: "Updates", icon: AlertCircle },
  { id: "notifications", label: "Subscribe", icon: Bell },
  { id: "legal", label: "Legal", icon: Scale },
];

export function NavigationRail({ activeTab, onTabChange, onShareClick, onCookieSettingsClick }: NavigationRailProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    if (moreOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [moreOpen]);

  return (
    <nav className="hidden md:flex md-nav-rail border-r border-md-outline-variant h-screen sticky top-0">
      {/* Logo */}
      <div className="py-5 px-3">
        <div
          className="w-10 h-10 rounded-m3-medium flex items-center justify-center"
          style={{ background: 'hsl(var(--md-sys-color-primary-container))', color: 'hsl(var(--md-sys-color-on-primary-container))' }}
        >
          <Rss className="w-[18px] h-[18px]" />
        </div>
      </div>

      {/* Main nav items */}
      <div className="flex-1 flex flex-col items-center gap-1 py-4">
        {mainItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="md-nav-rail-item"
              data-active={isActive}
              aria-label={item.label}
            >
              <div className={cn("md-nav-rail-item-icon", isActive && "bg-md-secondary-container")}>
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-md-on-secondary-container" : "text-md-on-surface-variant")} />
              </div>
              <span className={cn("label-small transition-colors", isActive ? "text-md-on-surface" : "text-md-on-surface-variant")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* More button */}
      <div className="relative pb-5 px-3 flex flex-col items-center" ref={menuRef}>
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          className="md-nav-rail-item"
          aria-label="More options"
        >
          <div className={cn("md-nav-rail-item-icon", moreOpen && "bg-md-secondary-container")}>
            <MoreVertical size={18} className="text-md-on-surface-variant" />
          </div>
          <span className="label-small text-md-on-surface-variant">More</span>
        </button>

        <AnimatePresence>
          {moreOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-full mb-1 ml-1 w-48 rounded-m3-large overflow-hidden z-50"
              style={{
                background: "hsl(var(--md-sys-color-surface-container))",
                boxShadow: "var(--md-sys-elevation-level2)",
              }}
            >
              <div className="py-1">
                <button
                  onClick={() => { setMoreOpen(false); onShareClick?.(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-md-surface-variant transition-colors"
                >
                  <Share2 size={18} className="text-md-on-surface-variant" />
                  <span className="label-large text-md-on-surface">Share</span>
                </button>
                <button
                  onClick={() => { setMoreOpen(false); onCookieSettingsClick?.(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-md-surface-variant transition-colors"
                >
                  <Cookie size={18} className="text-md-on-surface-variant" />
                  <span className="label-large text-md-on-surface">Cookie Settings</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
