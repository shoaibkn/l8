import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export default function NoSales() {
  return (
    <section className="bg-primary/10">
      {/*https://framerusercontent.com/images/VulBQhVJJgXCyTIKKvhsZMa5TU.png?width=2244&height=715*/}
      <div className="md:px-12 px-6 pt-24 bg-[url('https://framerusercontent.com/images/VulBQhVJJgXCyTIKKvhsZMa5TU.png')] bg-contain bg-bottom bg-no-repeat w-full h-full min-h-[800px] md:grid md:grid-cols-2 flex flex-col">
        <div>
          <h1 className="font-display text-right w-full wrap-break-word leading-[clamp(3rem,5vw,8rem)] uppercase text-[clamp(3rem,5vw,8rem)] font-semibold tracking-tighter">
            No salespeople. No bots. You’ll speak directly with us.
          </h1>
        </div>
        <div className="w-full flex flex-col md:pt-96 pt-48 md:col-span-2 lg:col-span-1">
          <Button
            className="uppercase bg-primary/5 rounded-none w-full md:w-1/2 h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
            variant={"link"}
          >
            Start Ai Journey
            <ChevronRight />
          </Button>
          <div className="flex flex-row text-xs text-muted-foreground uppercase tracking-tighter p-6">
            DEDICATED TO YOUR GROWTH worldwide
          </div>
        </div>
      </div>
    </section>
  );
}
