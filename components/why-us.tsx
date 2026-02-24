import { Dot, Plus } from "lucide-react";
import AdvantagesList from "./advantages-list";

export default function WhyUs() {
  return (
    <>
      <div className="flex flex-row justify-between w-full bg-primary/90 ">
        <Plus size={12} className="relative left-4.5 md:left-10.5 top-13.5" />
        <Plus size={12} className="relative right-4.5 md:right-10.5 top-13.5" />
      </div>
      <section className="flex flex-col md:flex-row justify-between md:px-12 px-6 pt-12 bg-primary/10 pb-24">
        <div className="md:w-1/2 w-full border-t border-0.5 pt-12">
          <div className="flex flex-row gap-4 relative right-4 text-xs font-mono tracking-tighter items-center h-fit align-middle leading-4  ">
            <span className="flex flex-row items-center">
              <Dot className="" size={36} />
              <span className="relative right-2">03</span>
            </span>
            <h4 className="uppercase text-muted-foreground relative right-2">
              Why Us?
            </h4>
          </div>
          <span className="font-display wrap-break-word leading-[clamp(4rem,6vw,8rem)] uppercase text-primary/50 text-[clamp(4rem,8vw,8rem)] font-semibold tracking-tighter">
            WHY COMPANIES <span className="text-primary">CHOOSE Effica®</span>
          </span>
          <p className="text-muted-foreground">
            We make AI adoption simple, strategic, and measurable.
          </p>
        </div>
        <div className="md:w-1/2 w-full flex flex-col justify-center gap-8 pt-24">
          <span className="uppercase text-[clamp(1rem,2vw,8rem)] font-bold tracking-tighter font-display">
            OUR ADVANTAGES <span className="text-primary/50">include:</span>
          </span>
          <div className="border-b border-muted">
            <AdvantagesList />
          </div>
        </div>
      </section>
    </>
  );
}
