import { RolloutStatus } from "@/types/changelog";

interface FilterBarProps {
  versions: string[];
  selectedVersion: string;
  selectedStatus: string;
  onVersionChange: (version: string) => void;
  onStatusChange: (status: string) => void;
}

export function FilterBar({
  versions,
  selectedVersion,
  selectedStatus,
  onVersionChange,
  onStatusChange,
}: FilterBarProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <select
        value={selectedVersion}
        onChange={(e) => onVersionChange(e.target.value)}
        className="btn-translucent cursor-pointer appearance-none bg-[hsl(var(--btn-translucent))] pr-8 focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Filter by version"
      >
        <option value="">All versions</option>
        {versions.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
        className="btn-translucent cursor-pointer appearance-none bg-[hsl(var(--btn-translucent))] pr-8 focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Filter by status"
      >
        <option value="">All statuses</option>
        <option value="Planned">Planned</option>
        <option value="Rolling out">Rolling out</option>
        <option value="Complete">Complete</option>
      </select>
    </div>
  );
}
