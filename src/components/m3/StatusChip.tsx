import { RolloutStatus } from "@/types/changelog";
import { Clock, RefreshCw, CheckCircle } from "lucide-react";
import { LucideIcon } from "./LucideIcon";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { LucideIcon as LucideIconType } from "lucide-react";

interface StatusChipProps {
  status: RolloutStatus;
  size?: "small" | "medium";
}

const statusConfig: Record<RolloutStatus, {
  label: string;
  icon: LucideIconType;
  bgClass: string;
  textClass: string;
}> = {
  Planned: {
    label: "Planned",
    icon: Clock,
    bgClass: "bg-status-planned/20",
    textClass: "text-status-planned",
  },
  "Rolling out": {
    label: "Rolling out",
    icon: RefreshCw,
    bgClass: "bg-status-rolling/20",
    textClass: "text-status-rolling",
  },
  Complete: {
    label: "Complete",
    icon: CheckCircle,
    bgClass: "bg-status-complete/20",
    textClass: "text-status-complete",
  },
};

export function StatusChip({ status, size = "medium" }: StatusChipProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-m3-small",
        size === "small" ? "px-2 py-0.5" : "px-3 py-1",
        config.bgClass
      )}
    >
      {status === "Rolling out" ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="flex items-center justify-center"
        >
          <LucideIcon 
            icon={config.icon} 
            size="small" 
            className={config.textClass} 
          />
        </motion.div>
      ) : (
        <LucideIcon 
          icon={config.icon} 
          size="small" 
          className={config.textClass} 
        />
      )}
      <span
        className={cn(
          config.textClass,
          size === "small" ? "label-small" : "label-medium"
        )}
      >
        {config.label}
      </span>
    </div>
  );
}
