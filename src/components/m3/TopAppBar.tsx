import { useState, useEffect } from "react";
import { Search, Sun, Moon, Rss } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopAppBarProps {
  title: string;
  isDark: boolean;
  onToggleTheme: () => void;
  onSearchClick?: () => void;
}

export function TopAppBar({ title, isDark, onToggleTheme, onSearchClick }: TopAppBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("md-top-app-bar", isScrolled && "md-top-app-bar-scrolled")}>
      {/* Mobile logo */}
      <div className="md:hidden mr-2">
        <div
          className="w-9 h-9 rounded-m3-medium flex items-center justify-center"
          style={{ background: 'hsl(var(--md-sys-color-primary-container))' }}
        >
          <Rss size={16} className="text-md-on-primary-container" />
        </div>
      </div>

      <h1 className="title-large text-md-on-surface flex-1">{title}</h1>

      <div className="flex items-center gap-0.5">
        <button onClick={onSearchClick} className="md-icon-button" aria-label="Search">
          <Search size={20} />
        </button>
        <button onClick={onToggleTheme} className="md-icon-button" aria-label="Toggle theme">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
