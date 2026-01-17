import { ChangelogEntry } from "@/types/changelog";

export const changelogEntries: ChangelogEntry[] = [
  {
    id: "1",
    version: "v2.1",
    release_date: "2026-01-15",
    summary: "Improved response quality and reduced latency",
    changes: [
      { type: "Improved", text: "Enhanced context understanding for longer conversations" },
      { type: "Improved", text: "Reduced average response time by 40%" },
      { type: "Fixed", text: "Resolved edge cases in code generation" },
    ],
    status: "Complete",
    links: [{ label: "Documentation", url: "#" }],
    created_at: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    version: "v2.0",
    release_date: "2026-01-10",
    summary: "Major architecture update with new capabilities",
    changes: [
      { type: "Added", text: "Support for multimodal inputs" },
      { type: "Added", text: "Extended context window to 128k tokens" },
      { type: "Improved", text: "More natural conversational flow" },
      { type: "Fixed", text: "Memory optimization for large documents" },
    ],
    status: "Complete",
    created_at: "2026-01-10T10:00:00Z",
  },
  {
    id: "3",
    version: "v1.9",
    release_date: "2026-01-05",
    summary: "Enhanced developer tools and API improvements",
    changes: [
      { type: "Added", text: "New streaming API endpoints" },
      { type: "Improved", text: "Better error messages and debugging info" },
      { type: "Fixed", text: "Rate limiting edge cases" },
    ],
    status: "Rolling out",
    created_at: "2026-01-05T10:00:00Z",
  },
  {
    id: "4",
    version: "v1.8",
    release_date: "2026-01-02",
    summary: "Performance optimizations and stability improvements",
    changes: [
      { type: "Improved", text: "Faster model initialization" },
      { type: "Fixed", text: "Rare timeout issues under high load" },
    ],
    status: "Planned",
    created_at: "2026-01-02T10:00:00Z",
  },
];
