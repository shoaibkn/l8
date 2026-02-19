import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export default function HowWeDoItComponent({
  id,
  text,
}: {
  id: string;
  text: string;
}) {
  return (
    <div
      className={cn(
        "w-full bg-accent h-36 md:h-48 flex flex-col justify-between items-start p-4 md:p-6 border-b border-accent-foreground/10",
      )}
    >
      <div className="flex flex-row justify-between w-full items-center">
        <h2 className="text-2xl font-bold font-display">{id}/</h2>
        <GripVertical size={18} className="text-muted-foreground opacity-50" />
      </div>
      <span className="text-xs text-muted-foreground">{text}</span>
    </div>
  );
}
