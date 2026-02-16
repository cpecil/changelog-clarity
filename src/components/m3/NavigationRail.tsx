import { useState, useRef, useEffect } from "react";
import { Home, AlertCircle, Bell, Scale, Rss, ChevronUp, Share2, Cookie } from "lucide-react";
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

      {/* More button at bottom */}
      <div className="relative pb-5 px-3 flex flex-col items-center" ref={menuRef}>
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          className="md-nav-rail-item"
          aria-label="More options"
        >
          <div className={cn("md-nav-rail-item-icon", moreOpen && "bg-md-secondary-container")}>
            <ChevronUp size={18} className={cn("transition-all duration-200", moreOpen ? "text-md-on-secondary-container rotate-180" : "text-md-on-surface-variant")} />
          </div>
          <span className="label-small text-md-on-surface-variant">More</span>
        </button>

        <AnimatePresence>
          {moreOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.92 }}
              transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
              className="absolute bottom-full left-full ml-2 mb-2 min-w-[200px] rounded-[16px] overflow-hidden z-[100]"
              style={{
                background: "hsl(var(--md-sys-color-surface-container))",
                boxShadow: "var(--md-sys-elevation-level2)",
                border: "1px solid hsl(var(--md-sys-color-outline-variant) / 0.3)",
              }}
            >
              <div className="py-2">
                <button
                  onClick={() => { setMoreOpen(false); onShareClick?.(); }}
                  className="w-full flex items-center gap-4 px-4 py-3 transition-colors hover:bg-[hsl(var(--md-sys-color-surface-variant)/0.5)]"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--md-sys-color-primary-container))" }}
                  >
                    <Share2 size={16} className="text-md-on-primary-container" />
                  </div>
                  <div className="text-left">
                    <p className="label-large text-md-on-surface">Share</p>
                    <p className="body-small text-md-on-surface-variant">Share this page</p>
                  </div>
                </button>
                <div className="mx-4 h-px" style={{ background: "hsl(var(--md-sys-color-outline-variant) / 0.4)" }} />
                <button
                  onClick={() => { setMoreOpen(false); onCookieSettingsClick?.(); }}
                  className="w-full flex items-center gap-4 px-4 py-3 transition-colors hover:bg-[hsl(var(--md-sys-color-surface-variant)/0.5)]"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "hsl(var(--md-sys-color-tertiary-container))" }}
                  >
                    <Cookie size={16} className="text-md-on-tertiary-container" />
                  </div>
                  <div className="text-left">
                    <p className="label-large text-md-on-surface">Cookie Settings</p>
                    <p className="body-small text-md-on-surface-variant">Manage preferences</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
