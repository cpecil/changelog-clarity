import { ChangelogEntry as ChangelogEntryType, ChangeType } from "@/types/changelog";
import { StatusIndicator } from "./StatusIndicator";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChangelogEntryProps {
  entry: ChangelogEntryType;
  index: number;
}

const typePrefix: Record<ChangeType, string> = {
  Added: "Add",
  Improved: "Improve",
  Fixed: "Fix",
};

export function ChangelogEntry({ entry, index }: ChangelogEntryProps) {
  const formattedDate = new Date(entry.release_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className="animate-fade-in border-b border-border py-8 last:border-b-0 md:py-10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{entry.version}</span>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
        <StatusIndicator status={entry.status} />
      </header>

      <p className="mb-4 text-foreground">{entry.summary}</p>

      <ul className="prose-changelog space-y-2">
        {entry.changes.map((change, i) => (
          <li key={i} className="relative pl-4 text-sm text-muted-foreground">
            <span
              className={cn(
                "mr-1.5 font-medium",
                change.type === "Added" && "text-foreground",
                change.type === "Improved" && "text-muted-foreground",
                change.type === "Fixed" && "text-muted-foreground"
              )}
            >
              {typePrefix[change.type]}
            </span>
            {change.text.replace(/^[A-Z][a-z]+ /, "")}
          </li>
        ))}
      </ul>

      {entry.links && entry.links.length > 0 && (
        <div className="mt-4 flex gap-3">
          {entry.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
