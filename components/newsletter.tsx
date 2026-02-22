import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Newsletter() {
  return (
    <section className="bg-primary text-primary-foreground items-center grid md:grid-cols-4 h-fit px-6 md:px-12 py-8 md:py-20 gap-6 md:gap-0">
      <h1 className="text-[clamp(3rem,4vw,8rem)] font-medium">Newsletter</h1>
      <p className="text-muted-foreground text-xs">
        We send occasional updates about new case studies and useful tips.
      </p>
      <div className="w-full flex flex-col gap-1">
        <Label className="text-muted-foreground font-mono tracking-tighter px-4 text-xs">
          Your Email
        </Label>
        <Input
          className="border-none bg-input-none border-b border-primary-foreground rounded-none h-14 p-0 placeholder:font-mono placeholder:text-xl px-4 backdrop:bg-none"
          type="email"
          placeholder="EMAIL@ADDRESS.COM"
        />
      </div>
      <Button
        className="uppercase text-primary-foreground rounded-none w-full h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-primary-foreground"
        variant={"link"}
      >
        Start Ai Journey
        <ChevronRight />
      </Button>
    </section>
  );
}
