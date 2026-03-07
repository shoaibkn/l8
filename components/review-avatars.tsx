import { Dot } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { reviewAvatarsContent } from "@/constants";

export default function ReviewAvatars() {
  return (
    <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 items-center">
      <div className="flex flex-row">
        <Avatar className={`border-2 w-8 h-8 border-primary-foreground`}>
          <AvatarImage
            src={reviewAvatarsContent.avatarSrc}
            alt={reviewAvatarsContent.avatarAlt}
          />
        </Avatar>
        <Avatar
          className={`border-2 w-8 h-8 border-primary-foreground relative -left-4`}
        >
          <AvatarImage
            src={reviewAvatarsContent.avatarSrc}
            alt={reviewAvatarsContent.avatarAlt}
          />
        </Avatar>
        <Avatar
          className={`border-2 w-8 h-8 border-primary-foreground relative -left-8`}
        >
          <AvatarImage
            src={reviewAvatarsContent.avatarSrc}
            alt={reviewAvatarsContent.avatarAlt}
          />
        </Avatar>
        <Avatar
          className={`border-2 w-8 h-8 border-primary-foreground relative -left-12`}
        >
          <AvatarImage
            src={reviewAvatarsContent.avatarSrc}
            alt={reviewAvatarsContent.avatarAlt}
          />
        </Avatar>
        <Avatar
          className={`border-2 w-8 h-8 border-primary-foreground relative -left-16`}
        >
          <AvatarImage
            src={reviewAvatarsContent.avatarSrc}
            alt={reviewAvatarsContent.avatarAlt}
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
          <span className="relative -left-20 text-xs">{reviewAvatarsContent.rating}</span>
        </div>
        <span className="text-xs text-muted-foreground flex flex-col items-start">
          {reviewAvatarsContent.reviewsPrefix}{" "}
          <span className="text-primary text-xs">{reviewAvatarsContent.reviewsHighlight}</span>
        </span>
      </div>
    </div>
  );
}
