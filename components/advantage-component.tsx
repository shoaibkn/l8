import { Plus } from "lucide-react";

export default function AdvantageComponent({
  id,
  text,
  htext,
}: {
  id: string;
  text: string;
  htext: string;
}) {
  return (
    <>
      <div className="flex flex-row justify-start items-center gap-4 border-muted border-t p-4 pb-2">
        <span className="bg-primary-foreground rounded-full w-10 items-center flex flex-row justify-center font-mono text-xs text-muted-foreground h-10">
          {id}
        </span>
        <span className="font-sans text-muted-foreground font-medium">
          {text} <span className="text-primary">{htext}</span>
        </span>
      </div>
      <Plus className="relative right-1.5 top-1.5" size={12} />
    </>
  );
}
