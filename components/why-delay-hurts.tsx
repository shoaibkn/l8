import { Dot } from "lucide-react";
import DelayProgressContainer from "./delay-progress-container";

export default function WhyDelayHurts() {
  return (
    <section className="flex flex-row flex-wrap justify-between bg-primary/20 md:px-12 px-6 pb-24">
      <div className="flex flex-col gap-4 pb-12">
        <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center align-middle leading-4">
          <span className="flex flex-row items-center">
            <Dot className="" size={36} />
            <span className="relative right-2">05</span>
          </span>
          <h4 className="uppercase text-muted-foreground relative right-2">
            why delay hurts
          </h4>
        </div>
        <span className="font-display md:w-1/2 w-full wrap-break-word leading-[clamp(2rem,4vw,6rem)] uppercase text-primary/50 text-[clamp(2rem,4vw,8rem)] font-semibold tracking-tighter">
          The longer you wait, the more expensive it becomes{" "}
          <span className="text-primary">to catch up.</span>
        </span>
      </div>
      <DelayProgressContainer />
    </section>
  );
}
