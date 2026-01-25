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
import { changelogEntries } from "@/data/changelog-data";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
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

  // Group entries by month
  const groupedEntries = useMemo(() => {
    const groups: { [key: string]: typeof filteredEntries } = {};
    filteredEntries.forEach((entry) => {
      const date = new Date(entry.release_date);
      const monthYear = date.toLocaleDateString("en-US", { 
        month: "long", 
        year: "numeric" 
      });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(entry);
    });
    return groups;
  }, [filteredEntries]);

  const renderContent = () => {
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
          <div className="max-w-4xl mx-auto py-6 md:py-8 px-4 md:px-6">
            {/* Hero */}
            <header className="mb-8">
              <h2 className="display-small text-md-on-surface mb-2">Changelog</h2>
              <p className="body-large text-md-on-surface-variant">
                All the latest updates, improvements, and fixes
              </p>
            </header>

            {/* Filters */}
            <div className="mb-8">
              <FilterChips
                versions={versions}
                selectedVersion={selectedVersion}
                selectedStatus={selectedStatus}
                onVersionChange={setSelectedVersion}
                onStatusChange={setSelectedStatus}
              />
            </div>

            {/* Timeline */}
            <div className="timeline-container">
              <div className="timeline-line" />
              
              {Object.keys(groupedEntries).length > 0 ? (
                Object.entries(groupedEntries).map(([monthYear, entries], groupIndex) => (
                  <div key={monthYear}>
                    {/* Month Header */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: groupIndex * 0.1 }}
                      className="month-header"
                    >
                      <h3 className="headline-small text-md-on-surface pl-8 md:pl-0">
                        {monthYear}
                      </h3>
                    </motion.div>

                    {/* Entries */}
                    <div className="space-y-0">
                      {entries.map((entry, index) => (
                        <TimelineEntry
                          key={entry.id}
                          entry={entry}
                          index={index + (groupIndex * 10)}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md-card-outlined p-12 text-center ml-8 md:ml-28"
                >
                  <p className="body-large text-md-on-surface-variant">
                    No entries match your filters
                  </p>
                </motion.div>
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
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
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
