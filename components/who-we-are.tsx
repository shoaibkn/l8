import { Dot, Plus } from "lucide-react";
import TextReveal from "./ui/text-reveal";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function WhoWeAre() {
  return (
    <section className="md:h-fit col-span-2 py-20 flex flex-col justify-between text-primary-foreground">
      {/*Top*/}
      <div className="flex flex-row justify-start px-6 md:pl-0">
        <div className="flex flex-row gap-4 relative md:right-2 right-10 text-xs font-mono tracking-tighter items-center h-fit align-middle leading-4  ">
          <span className="flex flex-row items-center">
            <Dot className="" size={36} />
            <span className="relative right-2">01</span>
          </span>
          <h4 className="uppercase text-muted-foreground relative right-2">
            WHO WE ARE
          </h4>
        </div>
      </div>
      <div className="h-fit md:pl-0  py-6">
        <TextReveal
          mode="opacity"
          duration={5}
          startOpacity={0.2}
          stagger={0.05}
          className="text-[clamp(2rem,4vw,8rem)] tracking-tighter leading-[clamp(2rem,4vw,8rem)] break-normal uppercase font-display font-semibold"
        >
          We&apos;re a hands-on team of AI consultants focused on helping small
          and mid-size businesses use automation where it matters most. We cut
          through the noise and implement it with no disruption.
        </TextReveal>
        <div className="flex flex-row gap-4 mt-12">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <h4 className="text-sm">Shoaib Khan</h4>
        </div>
      </div>
    </section>
  );
}
