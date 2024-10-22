import { cn } from "@/lib/utils";
import { DashboardIcon } from "@radix-ui/react-icons";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-1 text-xl font-semibold", className)}
    >
      <DashboardIcon className="text-primary size-7" /> Tasklify
    </div>
  );
}
