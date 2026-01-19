import { RolloutStatus } from "@/types/changelog";
import { cn } from "@/lib/utils";
import { Circle, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface StatusChipProps {
  status: RolloutStatus;
  size?: "small" | "medium";
}

const statusConfig: Record<RolloutStatus, {
  label: string;
  icon: typeof Circle;
  bgClass: string;
  textClass: string;
}> = {
  Planned: {
    label: "Planned",
    icon: Circle,
    bgClass: "bg-status-planned/20",
    textClass: "text-status-planned",
  },
  "Rolling out": {
    label: "Rolling out",
    icon: Loader2,
    bgClass: "bg-status-rolling/20",
    textClass: "text-status-rolling",
  },
  Complete: {
    label: "Complete",
    icon: CheckCircle2,
    bgClass: "bg-status-complete/20",
    textClass: "text-status-complete",
  },
};

export function StatusChip({ status, size = "medium" }: StatusChipProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

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
          <Icon className={cn("w-3.5 h-3.5", config.textClass)} />
        </motion.div>
      ) : (
        <Icon className={cn("w-3.5 h-3.5", config.textClass)} />
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
