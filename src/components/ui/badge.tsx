import * as React from "react"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
  clickable?: boolean;
}

function Badge({ className = "", variant = "default", clickable = false, ...props }: BadgeProps) {
  const variantClass = variant !== "default" ? `badge--${variant}` : "";
  const clickableClass = clickable ? "badge--clickable" : "";
  const classes = ["badge", variantClass, clickableClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props} />
  )
}

export { Badge }
