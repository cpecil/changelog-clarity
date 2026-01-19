import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FABProps {
  onClick: () => void;
  label?: string;
  extended?: boolean;
  className?: string;
}

export function FAB({ onClick, label, extended = false, className }: FABProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        extended ? "md-fab-extended" : "md-fab",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      aria-label={label || "Action"}
    >
      <Plus className="w-6 h-6" />
      {extended && label && <span>{label}</span>}
    </motion.button>
  );
}
