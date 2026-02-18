import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Play, Volume2, CheckCircle2, Clock, Rocket, Circle, Share2 } from "lucide-react";
import { changelogEntries } from "@/data/changelog-data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { cookies } from "@/lib/cookies";

const categoryConfig: Record<string, { label: string; class: string }> = {
  feature: { label: "Feature", class: "category-badge feature" },
  improvement: { label: "Update", class: "category-badge update" },
  bugfix: { label: "Fix", class: "category-badge fix" },
  security: { label: "Security", class: "category-badge fix" },
  breaking: { label: "Breaking", class: "category-badge announcement" },
};

const statusIcon: Record<string, typeof Circle> = {
  Complete: CheckCircle2,
  "Rolling out": Rocket,
  Planned: Clock,
};

const statusColor: Record<string, string> = {
  Complete: "--status-complete",
  "Rolling out": "--status-rolling",
  Planned: "--status-planned",
};

export default function EntryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => cookies.getTheme() === "dark");

  const entry = changelogEntries.find((e) => e.id === id);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    cookies.setTheme(isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (entry) {
      cookies.setLastRead(entry.id);
      window.scrollTo(0, 0);
    }
  }, [entry]);

  if (!entry) {
    return (
      <div className="min-h-screen bg-md-surface flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="headline-small text-md-on-surface">Entry not found</p>
          <button onClick={() => navigate("/")} className="md-filled-button">
            <ArrowLeft size={16} /> Back to Changelog
          </button>
        </div>
      </div>
    );
  }

  const cat = entry.category ? categoryConfig[entry.category] : { label: "Update", class: "category-badge update" };
  const StatusIcon = statusIcon[entry.status] || Circle;
  const date = new Date(entry.release_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shareEntry = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: entry.summary, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  // Find prev/next entries
  const currentIndex = changelogEntries.findIndex((e) => e.id === id);
  const prevEntry = currentIndex < changelogEntries.length - 1 ? changelogEntries[currentIndex + 1] : null;
  const nextEntry = currentIndex > 0 ? changelogEntries[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-md-surface">
      {/* Top App Bar */}
      <header
        className="sticky top-0 z-40 flex items-center h-16 px-2"
        style={{
          background: "hsl(var(--md-sys-color-surface))",
          borderBottom: "1px solid hsl(var(--md-sys-color-outline-variant) / 0.4)",
        }}
      >
        <button onClick={() => navigate("/")} className="md-icon-button" aria-label="Back">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1 min-w-0 px-2">
          <p className="title-medium text-md-on-surface truncate">{entry.summary}</p>
        </div>
        <button onClick={shareEntry} className="md-icon-button" aria-label="Share">
          <Share2 size={20} />
        </button>
      </header>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="w-full max-w-2xl mx-auto pb-12"
      >
        {/* Hero Image */}
        {entry.header_image && (
          <div className="relative h-48 sm:h-64 overflow-hidden">
            <img
              src={entry.header_image}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--md-sys-color-surface))] via-transparent to-transparent" />
          </div>
        )}

        <div className="px-4 sm:px-6 space-y-6" style={{ marginTop: entry.header_image ? "-2rem" : "1.5rem" }}>
          {/* Title section */}
          <div className="relative space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={cat.class}>{cat.label}</span>
              <span className="md-version-badge">{entry.version}</span>
            </div>

            <h1 className="headline-medium sm:headline-large text-md-on-surface">
              {entry.summary}
            </h1>

            {/* Status & Date row */}
            <div
              className="flex items-center gap-3 p-3 rounded-[16px]"
              style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
            >
              <StatusIcon
                className="w-5 h-5 shrink-0"
                style={{ color: `hsl(var(${statusColor[entry.status] || "--status-complete"}))` }}
              />
              <div className="flex-1">
                <p className="label-large text-md-on-surface">{entry.status}</p>
                <p className="body-small text-md-on-surface-variant">{date}</p>
              </div>
            </div>
          </div>

          {/* Changes */}
          {entry.changes.length > 0 && (
            <div
              className="p-4 sm:p-5 rounded-[20px]"
              style={{
                background: "hsl(var(--md-sys-color-surface-container-low))",
                border: "1px solid hsl(var(--md-sys-color-outline-variant) / 0.4)",
              }}
            >
              <p className="label-medium text-md-on-surface-variant mb-4">Changes</p>
              <div className="relative pl-5 space-y-4">
                <div
                  className="absolute left-[7px] top-1 bottom-1 w-px"
                  style={{ background: "hsl(var(--md-sys-color-outline-variant))" }}
                />
                {entry.changes.map((change, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div
                      className="absolute -left-5 top-1.5 w-[9px] h-[9px] rounded-full border-2"
                      style={{
                        borderColor:
                          change.type === "Added"
                            ? "hsl(var(--status-complete))"
                            : change.type === "Improved"
                              ? "hsl(var(--md-sys-color-primary))"
                              : "hsl(var(--status-planned))",
                        background: "hsl(var(--md-sys-color-surface-container-low))",
                      }}
                    />
                    <span
                      className={cn(
                        "label-small px-2 py-0.5 rounded-full shrink-0",
                        change.type === "Added" && "bg-status-complete/12 text-status-complete",
                        change.type === "Improved" && "bg-md-primary/12 text-md-primary",
                        change.type === "Fixed" && "bg-status-planned/12 text-status-planned"
                      )}
                    >
                      {change.type}
                    </span>
                    <span className="body-medium text-md-on-surface-variant">{change.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Info (MDX/Markdown) */}
          {entry.detailed_info && (
            <div
              className="p-4 sm:p-6 rounded-[20px]"
              style={{
                background: "hsl(var(--md-sys-color-surface-container-low))",
                border: "1px solid hsl(var(--md-sys-color-outline-variant) / 0.4)",
              }}
            >
              <div className="prose-changelog">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{entry.detailed_info}</ReactMarkdown>
              </div>
            </div>
          )}

          {/* Media Grid */}
          {entry.media && entry.media.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {entry.media.map((item, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[16px]"
                  style={{ border: "1px solid hsl(var(--md-sys-color-outline-variant) / 0.3)" }}
                >
                  {item.type === "image" && (
                    <img
                      src={item.url}
                      alt={item.alt || ""}
                      className="w-full h-40 sm:h-48 object-cover"
                      loading="lazy"
                    />
                  )}
                  {item.type === "video" && (
                    <div
                      className="w-full h-40 sm:h-48 flex items-center justify-center"
                      style={{ background: "hsl(var(--md-sys-color-surface-container-highest))" }}
                    >
                      <Play className="w-10 h-10" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
                    </div>
                  )}
                  {item.type === "audio" && (
                    <div
                      className="w-full h-16 flex items-center gap-3 px-4"
                      style={{ background: "hsl(var(--md-sys-color-surface-container-highest))" }}
                    >
                      <Volume2 className="w-5 h-5 shrink-0" style={{ color: "hsl(var(--md-sys-color-primary))" }} />
                      <div className="flex-1 h-1 rounded-full" style={{ background: "hsl(var(--md-sys-color-outline-variant))" }}>
                        <div className="w-1/3 h-full rounded-full" style={{ background: "hsl(var(--md-sys-color-primary))" }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Actions & Links */}
          {(entry.actions?.length || entry.links?.length) && (
            <div className="flex flex-wrap items-center gap-3">
              {entry.actions?.map((action, i) => (
                <button
                  key={i}
                  onClick={() => action.onClick?.()}
                  className={action.variant === "filled" ? "md-filled-button" : "md-outlined-button"}
                >
                  {action.label}
                </button>
              ))}
              {entry.links?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="inline-flex items-center gap-1 label-large hover:underline"
                  style={{ color: "hsl(var(--md-sys-color-primary))" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              ))}
            </div>
          )}

          {/* Prev / Next Navigation */}
          <div
            className="flex gap-3 pt-4"
            style={{ borderTop: "1px solid hsl(var(--md-sys-color-outline-variant) / 0.4)" }}
          >
            {prevEntry ? (
              <button
                onClick={() => navigate(`/entry/${prevEntry.id}`)}
                className="flex-1 text-left p-4 rounded-[16px] transition-colors"
                style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
              >
                <p className="label-small text-md-on-surface-variant mb-1">← Older</p>
                <p className="title-small text-md-on-surface truncate">{prevEntry.summary}</p>
                <p className="label-small text-md-on-surface-variant">{prevEntry.version}</p>
              </button>
            ) : (
              <div className="flex-1" />
            )}
            {nextEntry ? (
              <button
                onClick={() => navigate(`/entry/${nextEntry.id}`)}
                className="flex-1 text-right p-4 rounded-[16px] transition-colors"
                style={{ background: "hsl(var(--md-sys-color-surface-container))" }}
              >
                <p className="label-small text-md-on-surface-variant mb-1">Newer →</p>
                <p className="title-small text-md-on-surface truncate">{nextEntry.summary}</p>
                <p className="label-small text-md-on-surface-variant">{nextEntry.version}</p>
              </button>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* Back to all */}
          <div className="text-center pt-2">
            <button onClick={() => navigate("/")} className="md-text-button">
              <ArrowLeft size={16} /> All Updates
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
