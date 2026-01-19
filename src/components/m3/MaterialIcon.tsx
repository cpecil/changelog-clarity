import { cn } from "@/lib/utils";

interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
  size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "text-[20px]",
  medium: "text-[24px]",
  large: "text-[40px]",
};

export function MaterialIcon({ 
  name, 
  className, 
  filled = false, 
  size = "medium" 
}: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-symbols-outlined select-none",
        sizeClasses[size],
        className
      )}
      style={{
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
