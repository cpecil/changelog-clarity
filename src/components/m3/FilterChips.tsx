import { motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { cn } from "@/lib/utils";
import { RolloutStatus } from "@/types/changelog";

interface FilterChipsProps {
  versions: string[];
  selectedVersion: string;
  selectedStatus: string;
  onVersionChange: (version: string) => void;
  onStatusChange: (status: string) => void;
}

const statuses: (RolloutStatus | "")[] = ["", "Planned", "Rolling out", "Complete"];

export function FilterChips({
  versions,
  selectedVersion,
  selectedStatus,
  onVersionChange,
  onStatusChange,
}: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* Version dropdown chip */}
      <div className="relative">
        <select
          value={selectedVersion}
          onChange={(e) => onVersionChange(e.target.value)}
          className={cn(
            "md-chip appearance-none pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-md-primary",
            selectedVersion && "md-chip-selected"
          )}
          aria-label="Filter by version"
        >
          <option value="">All versions</option>
          {versions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <LucideIcon 
          icon={ChevronDown} 
          size="small" 
          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-md-on-surface-variant" 
        />
      </div>

      {/* Status chips */}
      {statuses.slice(1).map((status) => (
        <motion.button
          key={status}
          onClick={() => onStatusChange(selectedStatus === status ? "" : status)}
          className={cn(
            "md-chip",
            selectedStatus === status && "md-chip-selected"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {selectedStatus === status && (
            <LucideIcon icon={Check} size="small" />
          )}
          {status}
        </motion.button>
      ))}
    </div>
  );
}
