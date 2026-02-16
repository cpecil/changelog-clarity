import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavigationRail } from "@/components/m3/NavigationRail";
import { TopAppBar } from "@/components/m3/TopAppBar";
import { BottomNavigation } from "@/components/m3/BottomNavigation";
import { TimelineEntry } from "@/components/m3/TimelineEntry";
import { FilterChips } from "@/components/m3/FilterChips";
import { SubscribePanel } from "@/components/m3/SubscribePanel";
import { LegalPanel } from "@/components/m3/LegalPanel";
import { SearchDialog } from "@/components/m3/SearchDialog";
import { HomePanel } from "@/components/m3/HomePanel";
import { CookieBanner } from "@/components/m3/CookieBanner";
import { CookieManagementPage } from "@/components/m3/CookieManagementPage";
import { ShareToolkit } from "@/components/m3/ShareToolkit";
import { changelogEntries } from "@/data/changelog-data";
import { cookies } from "@/lib/cookies";

const Index = () => {
  const [isDark, setIsDark] = useState(() => cookies.getTheme() === 'dark');
  const [activeTab, setActiveTab] = useState(() => cookies.getActiveTab() || "home");
  const [selectedVersion, setSelectedVersion] = useState(() => cookies.getFilterVersion());
  const [selectedStatus, setSelectedStatus] = useState(() => cookies.getFilterStatus());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showCookieManagement, setShowCookieManagement] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Cookie: persist theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    cookies.setTheme(isDark ? 'dark' : 'light');
  }, [isDark]);

  // Cookie: persist active tab
  useEffect(() => { cookies.setActiveTab(activeTab); }, [activeTab]);

  // Cookie: persist filters
  useEffect(() => { cookies.setFilterVersion(selectedVersion); }, [selectedVersion]);
  useEffect(() => { cookies.setFilterStatus(selectedStatus); }, [selectedStatus]);

  // Cookie: track visits & session
  useEffect(() => {
    cookies.incrementVisitCount();
    cookies.setLastVisit();
    cookies.initSession();
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const versions = useMemo(() => [...new Set(changelogEntries.map((e) => e.version))], []);

  const filteredEntries = useMemo(() => {
    return changelogEntries.filter((entry) => {
      if (selectedVersion && entry.version !== selectedVersion) return false;
      if (selectedStatus && entry.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedVersion, selectedStatus]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof filteredEntries> = {};
    filteredEntries.forEach((entry) => {
      const key = new Date(entry.release_date).toLocaleDateString("en-US", { month: "long", year: "numeric" });
      if (!g[key]) g[key] = [];
      g[key].push(entry);
    });
    return g;
  }, [filteredEntries]);

  const handleSearchSelect = (entry: typeof changelogEntries[0]) => {
    setActiveTab("alerts");
    setSelectedVersion("");
    setSelectedStatus("");
    cookies.setLastRead(entry.id);
  };

  const handleTabChange = (tab: string) => {
    setShowCookieManagement(false);
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (showCookieManagement) {
      return <CookieManagementPage onBack={() => setShowCookieManagement(false)} />;
    }

    switch (activeTab) {
      case "home":
        return <HomePanel onNavigate={setActiveTab} />;
      case "notifications":
        return <SubscribePanel />;
      case "legal":
        return <LegalPanel />;
      case "alerts":
      default:
        return (
          <div className="w-full max-w-2xl mx-auto py-6 px-4 sm:px-6">
            <header className="mb-6">
              <h2 className="title-large sm:headline-small text-md-on-surface mb-1">Changelog</h2>
              <p className="body-medium text-md-on-surface-variant">Updates, improvements, and fixes</p>
            </header>

            <div className="mb-6">
              <FilterChips
                versions={versions}
                selectedVersion={selectedVersion}
                selectedStatus={selectedStatus}
                onVersionChange={setSelectedVersion}
                onStatusChange={setSelectedStatus}
              />
            </div>

            {Object.keys(grouped).length > 0 ? (
              Object.entries(grouped).map(([month, entries], gi) => (
                <div key={month} className="mb-6">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: gi * 0.05 }}
                    className="title-medium text-md-on-surface-variant mb-3"
                  >
                    {month}
                  </motion.h3>
                  <div className="space-y-3">
                    {entries.map((entry, i) => (
                      <TimelineEntry key={entry.id} entry={entry} index={i} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="md-card-outlined p-10 text-center">
                <p className="body-medium text-md-on-surface-variant">No matching entries</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="app-shell bg-md-surface min-h-screen">
      <NavigationRail
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onShareClick={() => setIsShareOpen(true)}
        onCookieSettingsClick={() => setShowCookieManagement(true)}
      />
      <div className="app-main pb-20 md:pb-0">
        <TopAppBar
          title="Changelog"
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onSearchClick={() => setIsSearchOpen(true)}
        />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={showCookieManagement ? 'cookie-mgmt' : activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onShareClick={() => setIsShareOpen(true)}
        onCookieSettingsClick={() => setShowCookieManagement(true)}
      />
      
      <CookieBanner onManage={() => setShowCookieManagement(true)} />
      <ShareToolkit isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        entries={changelogEntries}
        onSelectEntry={handleSearchSelect}
      />
    </div>
  );
};

export default Index;
