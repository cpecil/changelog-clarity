import { motion } from "framer-motion";
import { Moon, Sun, Palette, Github, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsPanelProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function SettingsPanel({ isDark, onToggleTheme }: SettingsPanelProps) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h2 className="headline-small text-md-on-surface px-4">Settings</h2>

        {/* Appearance section */}
        <div className="md-card-elevated overflow-hidden">
          <div className="p-4 border-b border-md-outline-variant">
            <h3 className="title-medium text-md-on-surface flex items-center gap-2">
              <Palette className="w-5 h-5 text-md-primary" />
              Appearance
            </h3>
          </div>

          <div className="divide-y divide-md-outline-variant">
            {/* Theme toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {isDark ? (
                  <Moon className="w-6 h-6 text-md-on-surface-variant" />
                ) : (
                  <Sun className="w-6 h-6 text-md-on-surface-variant" />
                )}
                <div>
                  <p className="body-large text-md-on-surface">Theme</p>
                  <p className="body-medium text-md-on-surface-variant">
                    {isDark ? "Dark mode" : "Light mode"}
                  </p>
                </div>
              </div>

              {/* M3 Switch */}
              <button
                onClick={onToggleTheme}
                className={cn(
                  "relative w-14 h-8 rounded-m3-full transition-colors",
                  isDark ? "bg-md-primary" : "bg-md-surface-variant"
                )}
                role="switch"
                aria-checked={isDark}
              >
                <motion.div
                  className={cn(
                    "absolute top-1 w-6 h-6 rounded-full transition-colors",
                    isDark ? "bg-md-on-primary" : "bg-md-outline"
                  )}
                  animate={{ left: isDark ? "calc(100% - 28px)" : "4px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Integrations section */}
        <div className="md-card-elevated overflow-hidden">
          <div className="p-4 border-b border-md-outline-variant">
            <h3 className="title-medium text-md-on-surface flex items-center gap-2">
              <Github className="w-5 h-5 text-md-primary" />
              Integrations
            </h3>
          </div>

          <div className="divide-y divide-md-outline-variant">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="body-large text-md-on-surface">GitHub Releases</p>
                <p className="body-medium text-md-on-surface-variant">
                  Sync changelog from GitHub releases
                </p>
              </div>
              <button className="md-tonal-button">Connect</button>
            </div>
          </div>
        </div>

        {/* Notifications section */}
        <div className="md-card-elevated overflow-hidden">
          <div className="p-4 border-b border-md-outline-variant">
            <h3 className="title-medium text-md-on-surface flex items-center gap-2">
              <Bell className="w-5 h-5 text-md-primary" />
              Notifications
            </h3>
          </div>

          <div className="divide-y divide-md-outline-variant">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="body-large text-md-on-surface">Email notifications</p>
                <p className="body-medium text-md-on-surface-variant">
                  Send emails when new entries are published
                </p>
              </div>
              <button
                className={cn(
                  "relative w-14 h-8 rounded-m3-full transition-colors bg-md-surface-variant"
                )}
                role="switch"
                aria-checked={false}
              >
                <div
                  className="absolute left-1 top-1 w-6 h-6 rounded-full bg-md-outline"
                />
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="px-4 pt-4">
          <p className="body-small text-md-on-surface-variant text-center">
            Changelog App · Built with Material Design 3
          </p>
        </div>
      </motion.div>
    </div>
  );
}
