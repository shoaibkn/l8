import { Dot, Plus } from "lucide-react";
import WhyUsBanner1 from "./why-us-banner-1";
import WhyUsBanner2 from "./why-us-banner-2";
import WhyUsBanner3 from "./why-us-banner-3";
import WhyUsBanner4 from "./why-us-banner-4";
import { whyUs } from "@/constants";

export default function WhyUsBanner() {
  return (
    <section className="bg-accent px-6 md:px-12 h-screen flex flex-col justify-start items-center align-middle py-4">
      <div className="w-full border-t"></div>
      <div className="flex flex-row justify-between w-full">
        <Plus size={12} className="relative right-1.5 bottom-1.5" />
        <Plus size={12} className="relative left-1.5 bottom-1.5" />
      </div>
      <div className="flex pt-24 w-full flex-row gap-4 relative right-4 text-xs font-mono tracking-tighter items-center align-middle justify-center leading-4">
        <span className="flex flex-row items-center">
          <Dot className="" size={36} />
          <span className="relative right-2">07</span>
        </span>
        <h4 className="uppercase relative right-2">why us?</h4>
      </div>
      <h1 className="py-12 font-display text-center w-full wrap-break-word leading-[clamp(3rem,5vw,8rem)] uppercase text-[clamp(3rem,5vw,8rem)] font-semibold tracking-tighter">
        why us
      </h1>
      <div className="grid md:grid-cols-4 grid-cols-2 w-full h-150">
        <WhyUsBanner1 />
        {whyUs.map((item) => (
          <WhyUsBanner2 key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
