import { GripHorizontal, GripVertical } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function WhyUsBanner1() {
  return (
    <div className="w-full border-y p-4 h-full flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl ">The team.</h3>
        <GripVertical className="text-muted-foreground" size={16} />
      </div>
      <div className="flex flex-row flex-wrap gap-4 justify-between">
        <div className="flex flex-row">
          <Avatar className={`border-2 w-8 h-8 border-primary-foreground`}>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Charlie White"
            />
          </Avatar>
          <Avatar
            className={`border-2 w-8 h-8 border-primary-foreground relative -left-4`}
          >
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Charlie White"
            />
          </Avatar>
          <Avatar
            className={`border-2 w-8 h-8 border-primary-foreground relative -left-8`}
          >
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Charlie White"
            />
          </Avatar>
          <Avatar
            className={`border-2 w-8 h-8 border-primary-foreground relative -left-12`}
          >
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Charlie White"
            />
          </Avatar>
          <Avatar
            className={`border-2 w-8 h-8 border-primary-foreground relative -left-16`}
          >
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Charlie White"
            />
          </Avatar>
        </div>
        <div className="flex flex-col uppercase font-mono tracking-tighter text-[12px] gap-0 leading-3">
          <span className="text-muted-foreground">How we change the way</span>
          <span>Your business works</span>
        </div>
      </div>
    </div>
  );
}
