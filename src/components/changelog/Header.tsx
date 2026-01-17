import { useState } from "react";
import { Rss, Moon, Sun } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container-changelog flex h-14 items-center justify-between">
        <h1 className="text-lg font-medium">Changelog</h1>
        
        <nav className="flex items-center gap-2">
          <a
            href="/rss.xml"
            className="btn-translucent p-2"
            aria-label="RSS Feed"
          >
            <Rss className="h-4 w-4" />
          </a>
          
          <button
            onClick={onToggleTheme}
            className="btn-translucent p-2"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
