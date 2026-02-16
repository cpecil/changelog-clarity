import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Cookie, Shield, BarChart3, Settings, Trash2, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
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

const allCookieDetails = [
  { name: 'cl_theme', purpose: 'Theme preference (light/dark)', expiry: '1 year', category: 'preferences' },
  { name: 'cl_active_tab', purpose: 'Active navigation tab', expiry: '1 year', category: 'preferences' },
  { name: 'cl_filter_version', purpose: 'Selected version filter', expiry: '30 days', category: 'functional' },
  { name: 'cl_filter_status', purpose: 'Selected status filter', expiry: '30 days', category: 'functional' },
  { name: 'cl_expanded', purpose: 'Expanded changelog entries', expiry: '7 days', category: 'functional' },
  { name: 'cl_last_visit', purpose: 'Last visit timestamp', expiry: '1 year', category: 'analytics' },
  { name: 'cl_visit_count', purpose: 'Total visit count', expiry: '1 year', category: 'analytics' },
  { name: 'cl_subscribed', purpose: 'Subscription email', expiry: '1 year', category: 'functional' },
  { name: 'cl_consent', purpose: 'Cookie consent choice', expiry: '1 year', category: 'essential' },
  { name: 'cl_lang', purpose: 'Language preference', expiry: '1 year', category: 'preferences' },
  { name: 'cl_search_history', purpose: 'Recent search queries', expiry: '30 days', category: 'functional' },
  { name: 'cl_font_size', purpose: 'Font size preference', expiry: '1 year', category: 'preferences' },
  { name: 'cl_notifications', purpose: 'Notification preference', expiry: '1 year', category: 'functional' },
  { name: 'cl_last_read', purpose: 'Last read entry ID', expiry: '1 year', category: 'functional' },
  { name: 'cl_scroll_*', purpose: 'Scroll position per tab', expiry: '1 day', category: 'functional' },
  { name: 'cl_sidebar', purpose: 'Sidebar collapsed state', expiry: '1 year', category: 'preferences' },
  { name: 'cl_sort', purpose: 'Sort order preference', expiry: '1 year', category: 'preferences' },
  { name: 'cl_view_mode', purpose: 'View mode (compact/detailed)', expiry: '1 year', category: 'preferences' },
  { name: 'cl_session', purpose: 'Analytics session ID', expiry: '~30 min', category: 'essential' },
  { name: 'cl_prefs_hash', purpose: 'Preferences change detection', expiry: '1 year', category: 'preferences' },
];

function getCookieValue(name: string): string | null {
  if (name.includes('*')) return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export function CookieManagementPage({ onBack }: CookieManagementPageProps) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    essential: true,
    preferences: true,
    functional: true,
    analytics: true,
  });
  const [liveStatus, setLiveStatus] = useState<Record<string, boolean>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Read real-time cookie status
  const refreshStatus = useCallback(() => {
    const status: Record<string, boolean> = {};
    allCookieDetails.forEach(c => {
      if (!c.name.includes('*')) {
        status[c.name] = getCookieValue(c.name) !== null;
      }
    });
    setLiveStatus(status);
  }, []);

  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 2000);
    return () => clearInterval(interval);
  }, [refreshStatus]);

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
    cookieCategories.forEach(cat => {
      if (!toggles[cat.id] && !cat.required) {
        cat.cookieNames.forEach(name => {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
      }
    });
    refreshStatus();
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
    refreshStatus();
    toast.success("All cookies cleared");
    setToggles({ essential: true, preferences: false, functional: false, analytics: false });
  };

  const activeCookieCount = Object.values(liveStatus).filter(Boolean).length;
  const totalCookies = allCookieDetails.length;

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="space-y-6"
      >
        {/* Back */}
        <button onClick={onBack} className="flex items-center gap-2 text-md-on-surface-variant body-medium hover:text-md-on-surface transition-colors">
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'hsl(var(--md-sys-color-tertiary-container))' }}
          >
            <Cookie size={22} className="text-md-on-tertiary-container" />
          </div>
          <div>
            <h1 className="headline-small text-md-on-surface">Cookie Settings</h1>
            <p className="body-medium text-md-on-surface-variant mt-0.5">Manage how cookies are used</p>
          </div>
        </div>

        {/* Real-time status card */}
        <div
          className="p-4 rounded-[16px] flex items-center gap-4"
          style={{ background: 'hsl(var(--md-sys-color-surface-container))' }}
        >
          <div className="flex-1 min-w-0">
            <p className="title-small text-md-on-surface">Active cookies</p>
            <p className="body-small text-md-on-surface-variant mt-0.5">
              {activeCookieCount} of {totalCookies} cookies are currently set
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div
              className="px-3 h-8 rounded-full flex items-center gap-1.5 label-medium"
              style={{
                background: activeCookieCount > 0 ? 'hsl(var(--status-complete) / 0.15)' : 'hsl(var(--md-sys-color-surface-variant))',
                color: activeCookieCount > 0 ? 'hsl(var(--status-complete))' : 'hsl(var(--md-sys-color-on-surface-variant))',
              }}
            >
              {activeCookieCount > 0 ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
              {activeCookieCount}/{totalCookies}
            </div>
            <button onClick={refreshStatus} className="md-icon-button w-8 h-8" aria-label="Refresh status">
              <RefreshCw size={14} className="text-md-on-surface-variant" />
            </button>
          </div>
        </div>

        {/* Category cards */}
        <div className="space-y-3">
          {cookieCategories.map((cat) => {
            const catCookies = allCookieDetails.filter(c => c.category === cat.id);
            const activeCatCount = catCookies.filter(c => !c.name.includes('*') && liveStatus[c.name]).length;
            const isExpanded = expandedCategory === cat.id;

            return (
              <div
                key={cat.id}
                className="rounded-[16px] overflow-hidden transition-colors"
                style={{
                  background: 'hsl(var(--md-sys-color-surface-container-low))',
                  border: '1px solid hsl(var(--md-sys-color-outline-variant) / 0.4)',
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 p-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'hsl(var(--md-sys-color-secondary-container))' }}
                  >
                    <cat.icon size={18} className="text-md-on-secondary-container" />
                  </div>

                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                    className="flex-1 text-left min-w-0"
                  >
                    <div className="flex items-center gap-2">
                      <p className="title-small text-md-on-surface">{cat.label}</p>
                      <span className="label-small text-md-on-surface-variant">
                        {activeCatCount}/{catCookies.length}
                      </span>
                    </div>
                    <p className="body-small text-md-on-surface-variant mt-0.5 line-clamp-1">{cat.description}</p>
                  </button>

                  {/* M3 Switch */}
                  <button
                    onClick={() => handleToggle(cat.id)}
                    disabled={cat.required}
                    className="relative shrink-0"
                    role="switch"
                    aria-checked={toggles[cat.id]}
                    aria-label={`Toggle ${cat.label} cookies`}
                  >
                    <div
                      className="w-[52px] h-[32px] rounded-full transition-all duration-200"
                      style={{
                        background: toggles[cat.id]
                          ? 'hsl(var(--md-sys-color-primary))'
                          : 'hsl(var(--md-sys-color-surface-container-highest))',
                        border: toggles[cat.id] ? 'none' : '2px solid hsl(var(--md-sys-color-outline))',
                        opacity: cat.required ? 0.5 : 1,
                      }}
                    >
                      <motion.div
                        animate={{ x: toggles[cat.id] ? 22 : 4 }}
                        transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                        className="absolute top-1/2 -translate-y-1/2 rounded-full shadow-sm"
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

                {/* Expanded cookie details */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-4 h-px" style={{ background: "hsl(var(--md-sys-color-outline-variant) / 0.3)" }} />
                    <div className="p-4 pt-3 space-y-2">
                      {catCookies.map((c) => {
                        const isActive = !c.name.includes('*') && liveStatus[c.name];
                        return (
                          <div
                            key={c.name}
                            className="flex items-center gap-3 py-2 px-3 rounded-[12px]"
                            style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
                          >
                            <div className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-[hsl(var(--status-complete))]' : 'bg-md-outline-variant'}`} />
                            <div className="flex-1 min-w-0">
                              <code className="label-small text-md-on-surface" style={{ fontFamily: 'ui-monospace, monospace' }}>
                                {c.name}
                              </code>
                              <p className="body-small text-md-on-surface-variant">{c.purpose}</p>
                            </div>
                            <span className="label-small text-md-on-surface-variant shrink-0">{c.expiry}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button onClick={savePreferences} className="md-filled-button flex-1">
            Save Preferences
          </button>
          <button onClick={acceptAll} className="md-tonal-button flex-1">
            Accept All
          </button>
        </div>

        <button onClick={clearAllCookies} className="md-outlined-button w-full text-md-error">
          <Trash2 size={16} /> Clear All Cookies
        </button>
      </motion.div>
    </div>
  );
}
