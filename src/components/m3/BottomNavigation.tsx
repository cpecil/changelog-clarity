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

        {/* More */}
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
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.92 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                className="absolute bottom-full right-0 mb-3 min-w-[220px] rounded-[16px] overflow-hidden z-[100]"
                style={{
                  background: "hsl(var(--md-sys-color-surface-container))",
                  boxShadow: "var(--md-sys-elevation-level2)",
                  border: "1px solid hsl(var(--md-sys-color-outline-variant) / 0.3)",
                }}
              >
                <div className="py-2">
                  {/* Legal */}
                  <button
                    onClick={() => { setMoreOpen(false); onTabChange("legal"); }}
                    className="w-full flex items-center gap-4 px-4 py-3 transition-colors hover:bg-[hsl(var(--md-sys-color-surface-variant)/0.5)]"
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "hsl(var(--md-sys-color-secondary-container))" }}
                    >
                      <Scale size={16} className="text-md-on-secondary-container" />
                    </div>
                    <div className="text-left">
                      <p className="label-large text-md-on-surface">Legal</p>
                      <p className="body-small text-md-on-surface-variant">Terms & policies</p>
                    </div>
                  </button>
                  <div className="mx-4 h-px" style={{ background: "hsl(var(--md-sys-color-outline-variant) / 0.4)" }} />
                  {/* Share */}
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
                  {/* Cookies */}
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
      </div>
    </nav>
  );
}
