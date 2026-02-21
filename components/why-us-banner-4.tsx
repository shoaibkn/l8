import { GripHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function WhyUsBanner4() {
  return (
    <div className="w-full h-full border">
      <div>
        <h3>The Team</h3>
        <GripHorizontal />
      </div>
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
    </div>
  );
}
