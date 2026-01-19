import { motion } from "framer-motion";
import { Menu, Moon, Sun, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopAppBarProps {
  title: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onMenuClick?: () => void;
  showSearch?: boolean;
  onSearchClick?: () => void;
}

export function TopAppBar({
  title,
  isDark,
  onToggleTheme,
  onMenuClick,
  showSearch = true,
  onSearchClick,
}: TopAppBarProps) {
  return (
    <header className="sticky top-0 z-40 bg-md-surface/95 backdrop-blur-sm border-b border-md-outline-variant">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onMenuClick}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-m3-full hover:bg-md-on-surface/[0.08]"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6 text-md-on-surface" />
            </motion.button>
          )}
          <h1 className="title-large text-md-on-surface">{title}</h1>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {showSearch && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onSearchClick}
              className="w-10 h-10 flex items-center justify-center rounded-m3-full hover:bg-md-on-surface/[0.08]"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-md-on-surface-variant" />
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-m3-full hover:bg-md-on-surface/[0.08]"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-md-on-surface-variant" />
            ) : (
              <Moon className="w-5 h-5 text-md-on-surface-variant" />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
