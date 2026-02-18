import { Plus } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function HeaderContactUs() {
  return (
    <div className="hidden md:flex flex-row justify-end gap-2 items-center absolute right-8 top-6 w-1/2">
      <span className="text-xs text-right w-48">
        <p className="text-muted-foreground">
          A 30 MINUTE CALL TO CLARIFY YOUR NEXT STEPS.
        </p>
        <p className="">ZERO OBLIGATIONS</p>
      </span>
      <div className="flex flex-row-reverse">
        <Button
          size="icon-lg"
          className="relative right-4 w-14 h-14 rounded-full hover:rotate-180 transition-all duration-700 hover:bg-primary"
        >
          <Plus width={48} height={48} size={64} />
        </Button>
        <Avatar className="w-14 h-14">
          <AvatarImage
            className="border-4 border-primary-foreground"
            src="https://github.com/shadcn.png"
            alt="shadcn"
          />
        </Avatar>
      </div>
    </div>
  );
}
