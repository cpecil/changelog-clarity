import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/changelog/Header";
import { Footer } from "@/components/changelog/Footer";
import { ChangelogEntry } from "@/components/changelog/ChangelogEntry";
import { FilterBar } from "@/components/changelog/FilterBar";
import { SubscribeForm } from "@/components/changelog/SubscribeForm";
import { MarkdownEditor } from "@/components/changelog/MarkdownEditor";
import { changelogEntries } from "@/data/changelog-data";
import { Edit3, X } from "lucide-react";

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editorContent, setEditorContent] = useState(
    `## v1.5

**Summary:** New features and improvements

### Changes

- **Add** custom themes support
- **Improve** performance for large datasets
- **Fix** navigation on mobile devices`
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

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

  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

      <main className="container-changelog py-8 md:py-12 lg:py-16">
        {/* Hero Section */}
        <section className="mb-12 md:mb-16">
          <h2 className="mb-3 text-2xl font-medium md:text-3xl lg:text-4xl">
            What's new
          </h2>
          <p className="mb-6 max-w-xl text-muted-foreground">
            The latest updates and improvements. Subscribe to stay informed.
          </p>
          <SubscribeForm />
        </section>

        {/* Editor Toggle */}
        <div className="mb-8 flex items-center justify-between">
          <FilterBar
            versions={versions}
            selectedVersion={selectedVersion}
            selectedStatus={selectedStatus}
            onVersionChange={setSelectedVersion}
            onStatusChange={setSelectedStatus}
          />
          
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="btn-translucent flex items-center gap-2"
          >
            {showEditor ? (
              <>
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Close</span>
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4" />
                <span className="hidden sm:inline">New entry</span>
              </>
            )}
          </button>
        </div>

        {/* Markdown Editor Panel */}
        {showEditor && (
          <section className="mb-8 animate-fade-in">
            <MarkdownEditor
              value={editorContent}
              onChange={setEditorContent}
              placeholder="Write your changelog entry in Markdown..."
            />
            <div className="mt-3 flex justify-end">
              <button className="btn-translucent">Save draft</button>
            </div>
          </section>
        )}

        {/* Changelog Entries */}
        <section>
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <ChangelogEntry key={entry.id} entry={entry} index={index} />
            ))
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              No entries match your filters
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
