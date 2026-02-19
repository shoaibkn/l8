import { ChevronRight, Dot, Plus } from "lucide-react";
import HowWeDoItContainer from "./how-we-do-it-container";
import { Button } from "./ui/button";

export default function HowWeDoIt() {
  return (
    <>
      <div className="flex absolute flex-row justify-between w-full">
        <Plus size={12} className="relative md:left-10.5 left-4.5 top-10.5" />
        <Plus size={12} className="relative md:right-10.5 right-4.5 top-10.5" />
      </div>
      <section className="bg-primary/20 h-fit w-full px-6 md:px-12 py-12">
        <div className="md:grid md:grid-cols-2 h-fit border-0.5 border-b  isolate z-50 relative border-0.5 border-primary/10 py-12">
          <div className="flex flex-col  justify-between md:justify-start gap-4">
            <div className="flex flex-row gap-4 relative right-2 pb-12 text-xs font-mono tracking-tighter items-center align-middle leading-4">
              <span className="flex flex-row items-center">
                <Dot className="" size={36} />
                <span className="relative right-2">05</span>
              </span>
              <h4 className="text-muted-foreground relative right-2">
                HOW WE DO IT?
              </h4>
            </div>
            {/*main Heading*/}
            <div className="flex flex-col h-fit gap-4 pb-24 justify-between md:justify-start">
              <span className="font-display wrap-break-word leading-[clamp(5rem,5vw,6rem)] uppercase text-primary/50 text-[clamp(4rem,8vw,8rem)] font-semibold tracking-tighter">
                The fast track to{" "}
                <span className="text-primary">AI Success</span>
              </span>
              <p className="font-display text-muted-foreground">
                No generic advice. No complex dashboards. Just practical
                improvements.
              </p>
            </div>
          </div>
          <div>
            <HowWeDoItContainer />
          </div>
        </div>
        <Button
          className="uppercase bg-primary/5 rounded-none w-full md:w-1/4 h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
          variant={"link"}
        >
          Start Ai Journey
          <ChevronRight />
        </Button>
      </section>
    </>
  );
}
