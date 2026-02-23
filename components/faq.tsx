import { faq } from "@/constants";
import { Dot, Plus } from "lucide-react";
import FAQComponent from "./faq-component";

export default function Faq() {
  return (
    <section className="bg-accent min-h-200 h-fit ">
      <div className="flex absolute flex-row justify-between w-full text-primary border-t mt-8">
        <Plus size={12} className="relative md:left-10.5 left-4.5 bottom-1.5" />
        <Plus
          size={12}
          className="relative md:right-10.5 right-4.5 bottom-1.5"
        />
      </div>
      <div className="grid md:grid-cols-4 md:px-12 px-6 pt-48">
        <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center h-fit align-middle leading-4  ">
          <span className="flex flex-row items-center">
            <Dot className="" size={36} />
            <span className="relative right-2">08</span>
          </span>
          <h4 className="uppercase text-muted-foreground relative right-2">
            Help & info
          </h4>
        </div>
        <div className="col-span-3">
          <h1 className="font-display w-full wrap-break-word leading-[clamp(2rem,6vw,6rem)] uppercase text-primary text-[clamp(2rem,6vw,8rem)] font-semibold tracking-tighter">
            FAQ
          </h1>
          <div className="flex flex-col gap-0 mt-24">
            {faq.map(({ id, question, answer }) => (
              <FAQComponent
                key={id}
                id={id}
                question={question}
                answer={answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
