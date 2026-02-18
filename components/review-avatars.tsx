import { Dot } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
    rating: 5,
    review: "Great product!",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://github.com/shadcn.png",
    rating: 4,
    review: "Good product!",
  },
  {
    id: 3,
    name: "Bob Johnson",
    avatar: "https://github.com/shadcn.png",
    rating: 3,
    review: "Average product!",
  },
  {
    id: 4,
    name: "Alice Brown",
    avatar: "https://github.com/shadcn.png",
    rating: 2,
    review: "Below average product!",
  },
  {
    id: 5,
    name: "Charlie White",
    avatar: "https://github.com/shadcn.png",
    rating: 1,
    review: "Terrible product!",
  },
];

export default function ReviewAvatars() {
  return (
    <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 items-center">
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
      <div className="flex flex-col gap-0 relative md:-left-16">
        <div className="flex flex-row gap-1 items-center">
          <span className="flex flex-row ">
            <Dot className="" />
            <Dot className="relative -left-8" />
            <Dot className="relative -left-10" />
            <Dot className="relative -left-14" />
            <Dot className="relative -left-18" />
          </span>
          <span className="relative -left-20 text-xs">4.9/5</span>
        </div>
        <span className="text-xs text-muted-foreground">
          BASED ON 230{" "}
          <span className="text-primary text-xs">VERIFIED REVIEWS</span>
        </span>
      </div>
    </div>
  );
}
