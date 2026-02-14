import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cookie, Shield, BarChart3, Settings, Trash2 } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { cookies } from "@/lib/cookies";
import { toast } from "sonner";

interface CookieManagementPageProps {
  onBack: () => void;
}

interface CookieCategory {
  id: string;
  label: string;
  description: string;
  icon: typeof Cookie;
  required: boolean;
  cookieNames: string[];
}

const cookieCategories: CookieCategory[] = [
  {
    id: "essential",
    label: "Essential",
    description: "Required for basic site functionality. These cannot be disabled.",
    icon: Shield,
    required: true,
    cookieNames: ["cl_consent", "cl_session"],
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Remember your settings like theme, language, sidebar state, font size, sort order, and view mode.",
    icon: Settings,
    required: false,
    cookieNames: ["cl_theme", "cl_active_tab", "cl_lang", "cl_font_size", "cl_sidebar", "cl_sort", "cl_view_mode", "cl_prefs_hash"],
  },
  {
    id: "functional",
    label: "Functional",
    description: "Enable features like saved filters, expanded entries, scroll position, last read tracking, and subscriptions.",
    icon: Cookie,
    required: false,
    cookieNames: ["cl_filter_version", "cl_filter_status", "cl_expanded", "cl_last_read", "cl_subscribed", "cl_notifications", "cl_search_history"],
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Help us understand how you use the site with visit count, last visit time, and scroll behavior.",
    icon: BarChart3,
    required: false,
    cookieNames: ["cl_last_visit", "cl_visit_count"],
  },
];

export function CookieManagementPage({ onBack }: CookieManagementPageProps) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    essential: true,
    preferences: true,
    functional: true,
    analytics: true,
  });

  // Load current state
  useEffect(() => {
    const consent = cookies.getConsent();
    if (consent === '0') {
      setToggles({ essential: true, preferences: false, functional: false, analytics: false });
    }
  }, []);

  const handleToggle = (id: string) => {
    if (id === "essential") return;
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const savePreferences = () => {
    cookies.setConsent(true);
    // Delete cookies for disabled categories
    cookieCategories.forEach(cat => {
      if (!toggles[cat.id] && !cat.required) {
        cat.cookieNames.forEach(name => {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
      }
    });
    toast.success("Cookie preferences saved");
    onBack();
  };

  const acceptAll = () => {
    setToggles({ essential: true, preferences: true, functional: true, analytics: true });
    cookies.setConsent(true);
    toast.success("All cookies accepted");
    onBack();
  };

  const clearAllCookies = () => {
    cookies.clearAll();
    toast.success("All cookies cleared", { description: "Preferences have been reset" });
    setToggles({ essential: true, preferences: false, functional: false, analytics: false });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Back button */}
        <button onClick={onBack} className="md-text-button flex items-center gap-2">
          <LucideIcon icon={ArrowLeft} size="small" />
          Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-m3-large flex items-center justify-center"
            style={{ background: 'hsl(var(--md-sys-color-tertiary-container))' }}
          >
            <LucideIcon icon={Cookie} className="text-md-on-tertiary-container" />
          </div>
          <div>
            <h1 className="headline-small text-md-on-surface">Cookie Management</h1>
            <p className="body-medium text-md-on-surface-variant">Control how cookies are used on this site</p>
          </div>
        </div>

        {/* Summary card */}
        <div className="md-card-filled p-4">
          <p className="body-medium text-md-on-surface-variant">
            We use <strong className="text-md-on-surface">20 cookies</strong> across 4 categories to provide functionality,
            remember preferences, and improve your experience. Essential cookies are always active.
          </p>
        </div>

        {/* Category toggles */}
        <div className="space-y-3">
          {cookieCategories.map((cat) => (
            <div
              key={cat.id}
              className="md-card-outlined p-4 sm:p-5"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-m3-medium flex items-center justify-center shrink-0"
                  style={{ background: 'hsl(var(--md-sys-color-secondary-container))' }}
                >
                  <cat.icon size={18} className="text-md-on-secondary-container" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="title-medium text-md-on-surface">{cat.label}</h3>

                    {/* Toggle switch */}
                    <button
                      onClick={() => handleToggle(cat.id)}
                      disabled={cat.required}
                      className="relative shrink-0"
                      aria-label={`Toggle ${cat.label} cookies`}
                    >
                      <div
                        className="w-[52px] h-[32px] rounded-full transition-colors duration-200"
                        style={{
                          background: toggles[cat.id]
                            ? 'hsl(var(--md-sys-color-primary))'
                            : 'hsl(var(--md-sys-color-surface-container-highest))',
                          border: toggles[cat.id] ? 'none' : '2px solid hsl(var(--md-sys-color-outline))',
                          opacity: cat.required ? 0.6 : 1,
                        }}
                      >
                        <motion.div
                          animate={{ x: toggles[cat.id] ? 22 : 4 }}
                          transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                          className="absolute top-1/2 -translate-y-1/2 rounded-full"
                          style={{
                            width: toggles[cat.id] ? 24 : 16,
                            height: toggles[cat.id] ? 24 : 16,
                            background: toggles[cat.id]
                              ? 'hsl(var(--md-sys-color-on-primary))'
                              : 'hsl(var(--md-sys-color-outline))',
                          }}
                        />
                      </div>
                    </button>
                  </div>

                  <p className="body-small text-md-on-surface-variant mb-2">{cat.description}</p>
                  <p className="label-small text-md-on-surface-variant">
                    {cat.cookieNames.length} cookie{cat.cookieNames.length !== 1 ? 's' : ''}
                    {cat.required && ' • Required'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-2">
          <button onClick={savePreferences} className="md-filled-button flex-1 min-w-[140px]">
            Save Preferences
          </button>
          <button onClick={acceptAll} className="md-tonal-button flex-1 min-w-[140px]">
            Accept All
          </button>
        </div>

        <div className="pt-2">
          <button onClick={clearAllCookies} className="md-outlined-button w-full text-md-error">
            <Trash2 size={16} /> Clear All Cookies
          </button>
        </div>

        {/* Cookie list detail */}
        <details className="md-card-outlined overflow-hidden">
          <summary className="p-4 cursor-pointer title-small text-md-on-surface hover:bg-md-surface-variant/50 transition-colors">
            View all 20 cookies
          </summary>
          <div className="px-4 pb-4">
            <div className="md-divider mb-3" />
            <div className="space-y-2">
              {[
                { name: 'cl_theme', purpose: 'Theme preference (light/dark)', expiry: '1 year' },
                { name: 'cl_active_tab', purpose: 'Remember active navigation tab', expiry: '1 year' },
                { name: 'cl_filter_version', purpose: 'Selected version filter', expiry: '30 days' },
                { name: 'cl_filter_status', purpose: 'Selected status filter', expiry: '30 days' },
                { name: 'cl_expanded', purpose: 'Expanded changelog entries', expiry: '7 days' },
                { name: 'cl_last_visit', purpose: 'Last visit timestamp', expiry: '1 year' },
                { name: 'cl_visit_count', purpose: 'Total visit count', expiry: '1 year' },
                { name: 'cl_subscribed', purpose: 'Subscription email', expiry: '1 year' },
                { name: 'cl_consent', purpose: 'Cookie consent choice', expiry: '1 year' },
                { name: 'cl_lang', purpose: 'Language preference', expiry: '1 year' },
                { name: 'cl_search_history', purpose: 'Recent search queries', expiry: '30 days' },
                { name: 'cl_font_size', purpose: 'Font size preference', expiry: '1 year' },
                { name: 'cl_notifications', purpose: 'Notification preference', expiry: '1 year' },
                { name: 'cl_last_read', purpose: 'Last read entry ID', expiry: '1 year' },
                { name: 'cl_scroll_*', purpose: 'Scroll position per tab', expiry: '1 day' },
                { name: 'cl_sidebar', purpose: 'Sidebar collapsed state', expiry: '1 year' },
                { name: 'cl_sort', purpose: 'Sort order preference', expiry: '1 year' },
                { name: 'cl_view_mode', purpose: 'View mode (compact/detailed)', expiry: '1 year' },
                { name: 'cl_session', purpose: 'Analytics session ID', expiry: '~30 min' },
                { name: 'cl_prefs_hash', purpose: 'Preferences change detection', expiry: '1 year' },
              ].map((c) => (
                <div key={c.name} className="flex items-start gap-3 py-1.5">
                  <code className="label-small px-1.5 py-0.5 rounded-m3-small shrink-0" style={{
                    background: 'hsl(var(--md-sys-color-surface-container-highest))',
                    fontFamily: 'ui-monospace, monospace',
                  }}>
                    {c.name}
                  </code>
                  <span className="body-small text-md-on-surface-variant flex-1">{c.purpose}</span>
                  <span className="label-small text-md-on-surface-variant shrink-0">{c.expiry}</span>
                </div>
              ))}
            </div>
          </div>
        </details>
      </motion.div>
    </div>
  );
}
