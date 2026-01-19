import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileCode, Globe, Check, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { changelogEntries } from "@/data/changelog-data";

export function ExportPanel() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const generateStaticHTML = () => {
    const entries = changelogEntries
      .map(
        (entry) => `
      <article class="changelog-entry">
        <header>
          <span class="version">${entry.version}</span>
          <time datetime="${entry.release_date}">${new Date(entry.release_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}</time>
          <span class="status status-${entry.status.toLowerCase().replace(" ", "-")}">${entry.status}</span>
        </header>
        <h2>${entry.summary}</h2>
        <ul>
          ${entry.changes.map((c) => `<li><span class="type type-${c.type.toLowerCase()}">${c.type}</span> ${c.text}</li>`).join("\n          ")}
        </ul>
      </article>`
      )
      .join("\n\n");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Changelog - Track all updates and improvements">
  <title>Changelog</title>
  <link rel="alternate" type="application/rss+xml" title="Changelog RSS" href="/rss.xml">
  <style>
    :root {
      --primary: #00897b;
      --on-primary: #ffffff;
      --surface: #f8fafa;
      --on-surface: #1a1c1c;
      --surface-variant: #dae5e3;
      --on-surface-variant: #3f4948;
      --outline: #6f7978;
      --status-planned: #f9a825;
      --status-rolling: #00897b;
      --status-complete: #43a047;
    }
    
    @media (prefers-color-scheme: dark) {
      :root {
        --surface: #1a1c1c;
        --on-surface: #e1e3e2;
        --surface-variant: #3f4948;
        --on-surface-variant: #bec9c7;
        --outline: #889392;
      }
    }
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--surface);
      color: var(--on-surface);
      line-height: 1.6;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    
    header.site-header {
      padding: 2rem 0;
      border-bottom: 1px solid var(--outline);
      margin-bottom: 2rem;
    }
    
    header.site-header h1 {
      font-size: 2rem;
      font-weight: 500;
    }
    
    .changelog-entry {
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--surface-variant);
    }
    
    .changelog-entry header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }
    
    .version {
      font-weight: 500;
      color: var(--primary);
    }
    
    time {
      font-size: 0.875rem;
      color: var(--on-surface-variant);
    }
    
    .status {
      font-size: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .status-planned { background: color-mix(in srgb, var(--status-planned) 20%, transparent); color: var(--status-planned); }
    .status-rolling-out { background: color-mix(in srgb, var(--status-rolling) 20%, transparent); color: var(--status-rolling); }
    .status-complete { background: color-mix(in srgb, var(--status-complete) 20%, transparent); color: var(--status-complete); }
    
    .changelog-entry h2 {
      font-size: 1.25rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
    
    .changelog-entry ul {
      list-style: none;
    }
    
    .changelog-entry li {
      padding: 0.5rem 0;
      color: var(--on-surface-variant);
    }
    
    .type {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      background: var(--surface-variant);
      margin-right: 0.5rem;
    }
    
    .type-added { color: var(--status-complete); }
    .type-improved { color: var(--primary); }
    .type-fixed { color: var(--status-planned); }
    
    footer {
      padding: 2rem 0;
      text-align: center;
      color: var(--on-surface-variant);
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="site-header">
      <h1>Changelog</h1>
    </header>
    
    <main>
      ${entries}
    </main>
    
    <footer>
      <p>Updates, clearly.</p>
    </footer>
  </div>
</body>
</html>`;
  };

  const generateRSSFeed = () => {
    const items = changelogEntries
      .map(
        (entry) => `
    <item>
      <title>${entry.version}: ${entry.summary}</title>
      <link>https://example.com/changelog#${entry.id}</link>
      <pubDate>${new Date(entry.release_date).toUTCString()}</pubDate>
      <description><![CDATA[
        <p>${entry.summary}</p>
        <ul>
          ${entry.changes.map((c) => `<li><strong>${c.type}:</strong> ${c.text}</li>`).join("")}
        </ul>
      ]]></description>
      <guid>https://example.com/changelog#${entry.id}</guid>
    </item>`
      )
      .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Changelog</title>
    <link>https://example.com/changelog</link>
    <description>Latest updates and improvements</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
  };

  const handleExport = async () => {
    setIsExporting(true);

    const zip = new JSZip();
    
    // Add files to zip
    zip.file("index.html", generateStaticHTML());
    zip.file("rss.xml", generateRSSFeed());
    zip.file("README.md", `# Changelog Static Site

## Deployment

This static site is ready to deploy to:

- **Vercel**: \`vercel deploy\`
- **Netlify**: Drag and drop the folder to netlify.com/drop
- **GitHub Pages**: Push to a gh-pages branch

## Files

- \`index.html\` - Main changelog page
- \`rss.xml\` - RSS feed for subscribers
`);

    // Generate and download
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "changelog-static.zip");

    setIsExporting(false);
    setExportComplete(true);

    setTimeout(() => setExportComplete(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md-card-elevated p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-m3-medium bg-md-tertiary-container flex items-center justify-center">
            <Globe className="w-6 h-6 text-md-on-tertiary-container" />
          </div>
          <div>
            <h2 className="headline-small text-md-on-surface">Export static site</h2>
            <p className="body-medium text-md-on-surface-variant">
              Download a deployable static site package
            </p>
          </div>
        </div>

        {/* Export options */}
        <div className="space-y-4 mb-8">
          <div className="md-card-outlined p-4 flex items-start gap-4">
            <FileCode className="w-6 h-6 text-md-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="title-medium text-md-on-surface">HTML + RSS Bundle</h3>
              <p className="body-medium text-md-on-surface-variant">
                Clean, semantic HTML with embedded styles. Includes RSS feed for subscribers.
                Ready for Vercel, Netlify, or any static host.
              </p>
            </div>
          </div>
        </div>

        {/* What's included */}
        <div className="mb-8">
          <h3 className="title-medium text-md-on-surface mb-3">Package includes</h3>
          <ul className="space-y-2">
            {[
              "index.html - Responsive changelog page",
              "rss.xml - RSS 2.0 feed",
              "README.md - Deployment instructions",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 body-medium text-md-on-surface-variant"
              >
                <Check className="w-4 h-4 text-status-complete flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Export button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="md-filled-button w-full disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : exportComplete ? (
            <>
              <Check className="w-5 h-5" />
              Downloaded!
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download static site
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
}
