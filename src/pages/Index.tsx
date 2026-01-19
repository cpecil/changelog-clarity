import { useState, useMemo, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { NavigationRail } from "@/components/m3/NavigationRail";
import { TopAppBar } from "@/components/m3/TopAppBar";
import { BottomNavigation } from "@/components/m3/BottomNavigation";
import { ChangelogCard } from "@/components/m3/ChangelogCard";
import { FilterChips } from "@/components/m3/FilterChips";
import { SubscribePanel } from "@/components/m3/SubscribePanel";
import { SearchDialog } from "@/components/m3/SearchDialog";
import { changelogEntries } from "@/data/changelog-data";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("changelog");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const versions = useMemo(
    () => [...new Set(changelogEntries.map((e) => e.version))],
    []
  );

  const filteredEntries = useMemo(() => {
    return changelogEntries.filter((entry) => {
      if (selectedVersion && entry.version !== selectedVersion) return false;
      if (selectedStatus && entry.status !== selectedStatus) return false;
      return true;
    });
  }, [selectedVersion, selectedStatus]);

  const renderContent = () => {
    switch (activeTab) {
      case "subscribe":
        return <SubscribePanel />;
      default:
        return (
          <div className="max-w-3xl mx-auto py-6 md:py-8 px-4 md:px-6">
            {/* Hero */}
            <header className="mb-8">
              <h2 className="display-small text-md-on-surface mb-2">What's new</h2>
              <p className="body-large text-md-on-surface-variant">
                Track all updates, improvements, and fixes
              </p>
            </header>

            {/* Filters */}
            <div className="mb-6">
              <FilterChips
                versions={versions}
                selectedVersion={selectedVersion}
                selectedStatus={selectedStatus}
                onVersionChange={setSelectedVersion}
                onStatusChange={setSelectedStatus}
              />
            </div>

            {/* Changelog grid */}
            <div className="space-y-4">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry, index) => (
                  <ChangelogCard key={entry.id} entry={entry} index={index} />
                ))
              ) : (
                <div className="md-card-outlined p-12 text-center">
                  <p className="body-large text-md-on-surface-variant">
                    No entries match your filters
                  </p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-shell bg-md-surface min-h-screen">
      {/* Navigation Rail - Desktop */}
      <NavigationRail activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content */}
      <div className="app-main pb-24 md:pb-0">
        <TopAppBar
          title="Changelog"
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onSearchClick={() => setIsSearchOpen(true)}
        />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Search Dialog */}
      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        entries={changelogEntries}
      />
    </div>
  );
};

export default Index;
