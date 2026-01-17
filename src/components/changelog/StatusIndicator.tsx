import { RolloutStatus } from "@/types/changelog";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: RolloutStatus;
}

const statusConfig: Record<RolloutStatus, { label: string; progress: number }> = {
  Planned: { label: "Planned", progress: 15 },
  "Rolling out": { label: "Rolling out", progress: 60 },
  Complete: { label: "Complete", progress: 100 },
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-3">
      <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            status === "Planned" && "bg-status-planned",
            status === "Rolling out" && "bg-status-rolling",
            status === "Complete" && "bg-status-complete"
          )}
          style={{ width: `${config.progress}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{config.label}</span>
    </div>
  );
}
