import { cn } from "../../lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input bg-background",
    amber: "bg-amber-100 text-amber-900",
    emerald: "bg-emerald-100 text-emerald-900",
    rose: "bg-rose-100 text-rose-900"
  };
  return <span className={cn("inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold", variants[variant], className)} {...props} />;
}
