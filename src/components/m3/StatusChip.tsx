import { RolloutStatus } from "@/types/changelog";
import { MaterialIcon } from "./MaterialIcon";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatusChipProps {
  status: RolloutStatus;
  size?: "small" | "medium";
}

const statusConfig: Record<RolloutStatus, {
  label: string;
  icon: string;
  bgClass: string;
  textClass: string;
}> = {
  Planned: {
    label: "Planned",
    icon: "schedule",
    bgClass: "bg-status-planned/20",
    textClass: "text-status-planned",
  },
  "Rolling out": {
    label: "Rolling out",
    icon: "sync",
    bgClass: "bg-status-rolling/20",
    textClass: "text-status-rolling",
  },
  Complete: {
    label: "Complete",
    icon: "check_circle",
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
        >
          <MaterialIcon 
            name={config.icon} 
            size="small" 
            className={cn("text-[16px]", config.textClass)} 
          />
        </motion.div>
      ) : (
        <MaterialIcon 
          name={config.icon} 
          size="small" 
          className={cn("text-[16px]", config.textClass)} 
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
