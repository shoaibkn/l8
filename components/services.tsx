import { Dot, Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function Services() {
  return (
    <section className="flex flex-row flex-wrap justify-between bg-primary/90 md:px-12 px-6 text-primary-foreground">
      <div className="flex flex-row flex-wrap justify-start md:pl-0 border-b border-muted-foreground border-0.5 pb-12">
        {/*left*/}
        <div className="flex flex-col gap-8 md:w-1/2 w-full pr-4">
          {/*top*/}
          <div className="flex flex-row gap-4 relative right-2">
            <span className="flex flex-row">
              <Dot /> 02
            </span>
            <h4 className="text-muted-foreground">SERVICES</h4>
          </div>
          <span className="text-[clamp(2rem,4vw,8rem)] tracking-tighter break-normal uppercase font-display font-semibold text-muted-foreground">
            turning repetitive work into{" "}
            <span className="text-primary-foreground">time-saving systems</span>
          </span>
        </div>

        {/*right*/}
        <div className="flex flex-col justify-between gap-8 w-full md:w-1/2 h-fit md:h-full">
          <p>
            We provide practical AI consulting and automation services for
            companies that want results — not just theory. Our work is tailored,
            transparent, and focused on the areas of your business where AI
            makes a real impact.
          </p>
          <Button
            variant="secondary"
            className="uppercase h-16 font-display rounded-full"
          >
            About us
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <Plus size={12} className="relative right-1.5 bottom-1.5" />
        <Plus size={12} className="relative left-1.5 bottom-1.5" />
      </div>
    </section>
  );
}
