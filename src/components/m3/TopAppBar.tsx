import { motion } from "framer-motion";
import { Search, Sun, Moon, Rss } from "lucide-react";
import { LucideIcon } from "./LucideIcon";

interface TopAppBarProps {
  title: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onSearchClick?: () => void;
}

export function TopAppBar({
  title,
  isDark,
  onToggleTheme,
  onSearchClick,
}: TopAppBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-md-surface/95 backdrop-blur-sm border-b border-md-outline-variant">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Mobile logo */}
          <div className="md:hidden w-10 h-10 rounded-m3-medium bg-md-primary-container flex items-center justify-center">
            <LucideIcon icon={Rss} className="text-md-on-primary-container" size="small" />
          </div>
          <h1 className="title-large text-md-on-surface">{title}</h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1">
          {/* Search button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSearchClick}
            className="w-10 h-10 flex items-center justify-center rounded-m3-full hover:bg-md-on-surface/[0.08] relative group"
            aria-label="Search (⌘K)"
          >
            <LucideIcon icon={Search} className="text-md-on-surface-variant" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-md-inverse-surface text-md-inverse-on-surface label-small opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              ⌘K
            </span>
          </motion.button>

          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-m3-full hover:bg-md-on-surface/[0.08]"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <LucideIcon 
              icon={isDark ? Sun : Moon} 
              className="text-md-on-surface-variant" 
            />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
