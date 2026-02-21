import { Dot, GripVertical } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function WhyUsBanner2({
  id,
  heading,
  title,
  tags,
  growth,
}: {
  id: number;
  heading: string;
  title: string;
  tags: string[];
  growth: string;
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between border-y">
      <div className="bg-primary/10 h-6 px-2 flex flex-row justify-between items-center">
        <span className="text-xs font-mono tracking-tighter">{heading}</span>
        <div className="flex flex-row gap-0">
          {Array.from({ length: id }, (_, i) => (
            <Dot key={i} size={16} className="text-muted-foreground" />
          ))}
        </div>
      </div>
      <div className="md:p-8 p-4 flex md:flex-row flex-col md:justify-between justify-start md:items-center items-start">
        <h1 className="text-[clamp(3rem,5vw,8rem)] font-display font-semibold">
          /{growth}
        </h1>
        <div className="flex flex-col gap-1 text-[10px] md:text-right text-left leading-2 uppercase">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
