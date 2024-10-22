import { cn } from "@/lib/utils";
import { DashboardIcon } from "@radix-ui/react-icons";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 font-mono text-lg font-semibold",
        className,
      )}
    >
      <DashboardIcon className="size-6 text-primary" /> Tasklify
    </div>
  );
}
