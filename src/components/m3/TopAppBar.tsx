import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Sun, Moon, Rss } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { cn } from "@/lib/utils";

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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "md-top-app-bar",
        isScrolled && "md-top-app-bar-scrolled"
      )}
    >
      {/* Leading - Mobile logo */}
      <div className="md:hidden mr-2">
        <div 
          className="w-10 h-10 rounded-m3-medium flex items-center justify-center"
          style={{ 
            background: 'hsl(var(--md-sys-color-primary-container))'
          }}
        >
          <LucideIcon 
            icon={Rss} 
            size="small" 
            className="text-md-on-primary-container" 
          />
        </div>
      </div>

      {/* Title */}
      <h1 className="title-large text-md-on-surface flex-1">{title}</h1>

      {/* Trailing actions */}
      <div className="flex items-center">
        {/* Search button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSearchClick}
          className="md-icon-button group relative"
          aria-label="Search (⌘K)"
        >
          <LucideIcon icon={Search} size="small" />
          <span 
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-m3-small label-small opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50"
            style={{ 
              background: 'hsl(var(--md-sys-color-inverse-surface))',
              color: 'hsl(var(--md-sys-color-inverse-on-surface))'
            }}
          >
            ⌘K
          </span>
        </motion.button>

        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleTheme}
          className="md-icon-button"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <LucideIcon 
            icon={isDark ? Sun : Moon} 
            size="small"
          />
        </motion.button>
      </div>
    </header>
  );
}
