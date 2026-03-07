import { Input } from "@/components/ui/input";
import { Dot } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="md:grid md:grid-cols-4 flex flex-col gap-12 px-6 md:px-12 items-start bg-primary/10 py-64">
      <div className="flex w-full flex-row gap-4 relative text-xs font-mono tracking-tighter items-center right-4 leading-4">
        <span className="flex flex-row items-center">
          <Dot className="" size={36} />
          <span className="relative right-2">START WITH A SIMPLE STEP</span>
        </span>
      </div>
      <div className="col-span-3 flex flex-col gap-6">
        <h1 className="font-display text-left w-full wrap-break-word leading-[clamp(3rem,6vw,9rem)] uppercase text-[clamp(3rem,6vw,9rem)] font-semibold tracking-tighter">
          LET’S START YOUR AI PROJECT
        </h1>
        <div className="flex flex-col gap-6 font-medium tracking-tighter items-start justify-end">
          <h3 className="text-2xl ">Hi Team Lumin8!</h3>
          <div className="flex md:flex-row flex-col items-center w-full border uppercase gap-6 font-mono md:flex-wrap">
            <div className="flex flex-row gap-6 items-center ">
              <span>My name is</span>
              <Input
                type="text"
                placeholder="your name"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background rounded-none h-12 w-64 placeholder:font-mono placeholder:uppercase"
              />
            </div>
            <div className="flex flex-row gap-6 items-center align-middle">
              from
              <Input
                type="text"
                placeholder="company name/optional"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background rounded-none h-12 w-64 placeholder:font-mono placeholder:uppercase"
              />
              .
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center align-middle w-full border uppercase gap-6 font-mono md:flex-wrap">
            <div className="flex flex-row gap-6 items-center align-middle">
              <span>I want to improve:</span>
              <Input
                type="text"
                placeholder="describe your workflow or challenge"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background rounded-none h-12 w-96 placeholder:font-mono placeholder:uppercase"
              />
              .
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center align-middle w-full border uppercase gap-6 font-mono md:flex-wrap">
            <div className="flex flex-row gap-6 items-center align-middle">
              <span>Budget:</span>
              <Input
                type="text"
                placeholder="enter budget"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background rounded-none h-12 w-64 placeholder:font-mono placeholder:uppercase"
              />{" "}
              $.
            </div>
          </div>
          <div className="flex md:flex-row flex-col items-center align-middle w-full border uppercase gap-6 font-mono md:flex-wrap">
            <div className="flex flex-row gap-6 items-center align-middle">
              <span>contact me at:</span>
              <Input
                type="text"
                placeholder="your email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background rounded-none h-12 w-64 placeholder:font-mono placeholder:uppercase"
              />
              .
            </div>
          </div>
        </div>
      </div>

      <div className="mt-36 grid grid-cols-4 w-full border col-span-4 items-start">
        <div className="flex w-full flex-row gap-4 relative text-xs font-mono tracking-tighter items-center right-4 leading-4 col-span-1">
          <span className="flex flex-row items-center">
            <Dot className="" size={36} />
            <span className="relative right-2 uppercase">
              Lets keep it simple
            </span>
          </span>
        </div>
        <div className="col-span-3">
          <h3 className="text-left w-full wrap-break-word font-semibold text-3xl">
            You don't need to prepare slides or technical notes — just share
            what's on your mind. Whether it's a quick question or a bigger
            project idea, we'll get back to you with a clear next step.
          </h3>
          <p className="text-muted-foreground mt-12 w-2/3">
            Every message that comes through this form is read by a real person
            on our team. No chatbots, no outsourced support. Most of the time,
            it’s Jessica or Laura who will see it first and make sure it reaches
            the right consultant.
          </p>
          <Image
            src="https://framerusercontent.com/images/5N9M2bHiLO1sid2bGxHTc6lf8bQ.jpg"
            width={1334}
            height={500}
            alt=""
          />
        </div>
      </div>
    </main>
  );
}
