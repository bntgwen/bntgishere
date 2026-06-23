import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal Bootstrap Icons adapter.
 * Bootstrap Icons are loaded globally in src/routes/__root.tsx.
 */
export function BiIcon({
  className,
  icon,
  size,
  title,
}: {
  icon: string; // e.g. "bi bi-laptop"
  className?: string;
  size?: number; // px -> sets fontSize
  title?: string;
}) {
  return (
    <i
      className={cn(icon, className)}
      style={size ? { fontSize: size } : undefined}
      aria-hidden={title ? undefined : true}
      title={title}
    />
  );
}

