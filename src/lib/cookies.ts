// Cookie Utility System - 20 basic cookies for logical and computational functioning

interface CookieOptions {
  days?: number;
  path?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

function setCookie(name: string, value: string, options: CookieOptions = {}) {
  const { days = 365, path = '/', secure = false, sameSite = 'Lax' } = options;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=${path};SameSite=${sameSite}${secure ? ';Secure' : ''}`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string, path = '/') {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
}

// ===== 20 COOKIE DEFINITIONS =====

// 1. Theme preference (light/dark)
export const cookies = {
  setTheme: (theme: 'light' | 'dark') => setCookie('cl_theme', theme),
  getTheme: () => getCookie('cl_theme') as 'light' | 'dark' | null,

  // 2. Active tab memory
  setActiveTab: (tab: string) => setCookie('cl_active_tab', tab),
  getActiveTab: () => getCookie('cl_active_tab'),

  // 3. Filter: selected version
  setFilterVersion: (v: string) => setCookie('cl_filter_version', v, { days: 30 }),
  getFilterVersion: () => getCookie('cl_filter_version') || '',

  // 4. Filter: selected status
  setFilterStatus: (s: string) => setCookie('cl_filter_status', s, { days: 30 }),
  getFilterStatus: () => getCookie('cl_filter_status') || '',

  // 5. Collapsed/expanded entries (store as JSON array of IDs)
  setExpandedEntries: (ids: string[]) => setCookie('cl_expanded', JSON.stringify(ids), { days: 7 }),
  getExpandedEntries: (): string[] => {
    const v = getCookie('cl_expanded');
    try { return v ? JSON.parse(v) : []; } catch { return []; }
  },

  // 6. Last visited timestamp
  setLastVisit: () => setCookie('cl_last_visit', new Date().toISOString()),
  getLastVisit: () => getCookie('cl_last_visit'),

  // 7. Visit count
  incrementVisitCount: () => {
    const count = parseInt(getCookie('cl_visit_count') || '0', 10) + 1;
    setCookie('cl_visit_count', String(count));
    return count;
  },
  getVisitCount: () => parseInt(getCookie('cl_visit_count') || '0', 10),

  // 8. Subscribed status
  setSubscribed: (email: string) => setCookie('cl_subscribed', email),
  getSubscribed: () => getCookie('cl_subscribed'),

  // 9. Cookie consent
  setConsent: (accepted: boolean) => setCookie('cl_consent', accepted ? '1' : '0'),
  getConsent: () => getCookie('cl_consent'),

  // 10. Preferred language
  setLanguage: (lang: string) => setCookie('cl_lang', lang),
  getLanguage: () => getCookie('cl_lang') || 'en',

  // 11. Search history (last 5 queries)
  addSearchQuery: (query: string) => {
    const v = getCookie('cl_search_history');
    let history: string[] = [];
    try { history = v ? JSON.parse(v) : []; } catch {}
    history = [query, ...history.filter(q => q !== query)].slice(0, 5);
    setCookie('cl_search_history', JSON.stringify(history), { days: 30 });
  },
  getSearchHistory: (): string[] => {
    const v = getCookie('cl_search_history');
    try { return v ? JSON.parse(v) : []; } catch { return []; }
  },

  // 12. Font size preference
  setFontSize: (size: 'small' | 'medium' | 'large') => setCookie('cl_font_size', size),
  getFontSize: () => getCookie('cl_font_size') as 'small' | 'medium' | 'large' | null,

  // 13. Notification preference
  setNotifications: (enabled: boolean) => setCookie('cl_notifications', enabled ? '1' : '0'),
  getNotifications: () => getCookie('cl_notifications') !== '0',

  // 14. Last read entry ID
  setLastRead: (id: string) => setCookie('cl_last_read', id),
  getLastRead: () => getCookie('cl_last_read'),

  // 15. Scroll position memory
  setScrollPosition: (tab: string, pos: number) => setCookie(`cl_scroll_${tab}`, String(pos), { days: 1 }),
  getScrollPosition: (tab: string) => parseInt(getCookie(`cl_scroll_${tab}`) || '0', 10),

  // 16. Sidebar collapsed state
  setSidebarCollapsed: (collapsed: boolean) => setCookie('cl_sidebar', collapsed ? '1' : '0'),
  getSidebarCollapsed: () => getCookie('cl_sidebar') === '1',

  // 17. Sort preference
  setSortOrder: (order: 'newest' | 'oldest') => setCookie('cl_sort', order),
  getSortOrder: () => (getCookie('cl_sort') as 'newest' | 'oldest') || 'newest',

  // 18. View mode (compact/detailed)
  setViewMode: (mode: 'compact' | 'detailed') => setCookie('cl_view_mode', mode),
  getViewMode: () => (getCookie('cl_view_mode') as 'compact' | 'detailed') || 'compact',

  // 19. Session ID (for analytics)
  initSession: () => {
    if (!getCookie('cl_session')) {
      setCookie('cl_session', `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, { days: 0.02 }); // ~30min
    }
    return getCookie('cl_session')!;
  },
  getSession: () => getCookie('cl_session'),

  // 20. User preferences hash (detect changes)
  setPreferencesHash: (hash: string) => setCookie('cl_prefs_hash', hash),
  getPreferencesHash: () => getCookie('cl_prefs_hash'),

  // Utility: clear all app cookies
  clearAll: () => {
    const names = [
      'cl_theme', 'cl_active_tab', 'cl_filter_version', 'cl_filter_status',
      'cl_expanded', 'cl_last_visit', 'cl_visit_count', 'cl_subscribed',
      'cl_consent', 'cl_lang', 'cl_search_history', 'cl_font_size',
      'cl_notifications', 'cl_last_read', 'cl_sidebar', 'cl_sort',
      'cl_view_mode', 'cl_session', 'cl_prefs_hash'
    ];
    names.forEach(n => deleteCookie(n));
  }
};
