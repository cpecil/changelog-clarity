import { useMemo, useCallback } from "react";
import lunr from "lunr";
import { ChangelogEntry } from "@/types/changelog";

interface SearchResult {
  entry: ChangelogEntry;
  score: number;
  matchFields: string[];
}

export function useLunrSearch(entries: ChangelogEntry[]) {
  // Build the Lunr index once
  const { index, entryMap } = useMemo(() => {
    const map = new Map<string, ChangelogEntry>();
    entries.forEach((e) => map.set(e.id, e));

    const idx = lunr(function () {
      this.ref("id");
      this.field("version", { boost: 10 });
      this.field("summary", { boost: 8 });
      this.field("category", { boost: 6 });
      this.field("status", { boost: 5 });
      this.field("changes", { boost: 4 });
      this.field("detailed_info", { boost: 3 });
      this.field("date", { boost: 4 });
      this.field("links", { boost: 2 });

      // Extend the pipeline to allow partial matching
      this.pipeline.remove(lunr.stemmer);
      this.searchPipeline.remove(lunr.stemmer);

      entries.forEach((entry) => {
        this.add({
          id: entry.id,
          version: entry.version,
          summary: entry.summary,
          category: entry.category || "",
          status: entry.status,
          changes: entry.changes.map((c) => `${c.type} ${c.text}`).join(" "),
          detailed_info: entry.detailed_info || "",
          date: new Date(entry.release_date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          links: entry.links?.map((l) => l.label).join(" ") || "",
        });
      });
    });

    return { index: idx, entryMap: map };
  }, [entries]);

  const search = useCallback(
    (query: string): SearchResult[] => {
      if (!query.trim()) return [];

      const q = query.trim();

      try {
        // Try wildcard search for partial matches
        let results = index.search(`${q}*`);

        // If no wildcard results, try fuzzy match
        if (results.length === 0) {
          results = index.search(`${q}~1`);
        }

        // If still nothing, try exact term
        if (results.length === 0) {
          results = index.search(q);
        }

        return results
          .map((result) => {
            const entry = entryMap.get(result.ref);
            if (!entry) return null;

            const matchFields = Object.keys(result.matchData.metadata).reduce<string[]>(
              (fields, term) => {
                const meta = (result.matchData.metadata as Record<string, Record<string, object>>)[term];
                return [...fields, ...Object.keys(meta)];
              },
              []
            );

            return {
              entry,
              score: result.score,
              matchFields: [...new Set(matchFields)],
            };
          })
          .filter((r): r is SearchResult => r !== null);
      } catch {
        // Fallback: simple includes-based search for special characters
        const lq = q.toLowerCase();
        return entries
          .filter(
            (e) =>
              e.version.toLowerCase().includes(lq) ||
              e.summary.toLowerCase().includes(lq) ||
              e.changes.some((c) => c.text.toLowerCase().includes(lq))
          )
          .map((entry) => ({ entry, score: 1, matchFields: ["summary"] }));
      }
    },
    [index, entryMap, entries]
  );

  return { search };
}
