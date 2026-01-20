import { LucideIcon as LucideIconType, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconWrapperProps extends Omit<LucideProps, "ref"> {
  icon: LucideIconType;
  className?: string;
  size?: "small" | "medium" | "large";
}

const sizeMap = {
  small: 18,
  medium: 24,
  large: 32,
};

export function LucideIcon({ 
  icon: Icon, 
  className, 
  size = "medium",
  ...props 
}: IconWrapperProps) {
  return (
    <Icon 
      size={sizeMap[size]} 
      className={cn("flex-shrink-0", className)} 
      {...props}
    />
  );
}
