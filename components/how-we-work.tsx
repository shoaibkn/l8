import { Dot, Plus } from "lucide-react";
import { LimeplayMediaPlayer } from "./basic-player/components/media-player";
import { Separator } from "./ui/separator";
import TextReveal from "./ui/text-reveal";
import GridColumns from "./providers/grid-provider";

export default function HowWeWork() {
  return (
    <section
      className={`py-6 md:py-12 md:h-[calc(100lvh+240px)] h-fit text-primary-foreground`}
    >
      <Separator className="opacity-20" />
      <div className="flex flex-row justify-between">
        <Plus size={12} className="relative right-1.5 bottom-1.5" />
        <Plus size={12} className="relative left-1.5 bottom-1.5" />
      </div>
      <div className="p-4 md:p-2 pb-0 flex flex-col md:mr-0 border-b border-muted-foreground border-0.5">
        {/*Top*/}

        <div className="flex flex-row justify-between text-xs items-center">
          <h4 className="font-display">HOW WE WORK</h4>
          <span className="flex flex-row items-center gap-1">
            <Dot className="w-fit h-12 relative left-4" /> 2:30
          </span>
        </div>
        {/*Heading*/}
        <h2 className="text-[clamp(0.5rem,4vw,1.2rem)] mt-12 mb-6">
          HOW WE HELP YOU USE AI WITHOUT HYPE
        </h2>

        {/*Video*/}
        <div className="hidden border-b border-b-muted/10 border-0.5">
          <LimeplayMediaPlayer
            className="rounded-4xl"
            src="https://ad391cc0d55b44c6a86d232548adc225.mediatailor.us-east-1.amazonaws.com/v1/master/d02fedbbc5a68596164208dd24e9b48aa60dadc7/singssai/master.m3u8"
          />
        </div>
        <div className="flex flex-row justify-between">
          <Plus
            size={12}
            className="relative right-5.5 top-1.5 md:right-3.5 md:top-3.5"
          />
          <Plus
            size={12}
            className="relative left-5.5 top-1.5 md:left-3.5 md:top-3.5"
          />
        </div>
      </div>
      <div className="h-fit border-b border-muted-foreground border-0.5 py-6">
        <TextReveal className="text-[clamp(1rem,1.6vw,1.6rem)] md:text-[clamp(0.4rem,1vw,1.6rem)] uppercase text-muted-foreground">
          We&apos;re a hands-on team of AI consultants focused on helping small
          and mid-size businesses use automation where it matters most
        </TextReveal>
        <div className="flex flex-row justify-between">
          <Plus size={12} className="relative top-7.5 right-1.5" />
          <Plus size={12} className="relative top-7.5 left-1.5" />
        </div>
      </div>
    </section>
  );
}
