import Image from "next/image";
import Figures from "./figures";
import { Dot } from "lucide-react";
import { bannerContent } from "@/constants";

export default function Banner() {
  return (
    <section className="bg-primary/10 p-6 md:p-12">
      <div className="bg-primary-foreground flex flex-col md:h-fit h-[1200px] relative ">
        <div className="grid md:grid-cols-4 py-6 px-4 gap-4">
          {bannerContent.figures.map((figure) => (
            <Figures
              key={`${figure.figure1}-${figure.figure2}`}
              figure1={figure.figure1}
              figure2={figure.figure2}
            />
          ))}
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-4 p-4">
          <div className="flex flex-row gap-4 items-center relative right-2 pb-12 text-muted-foreground">
            <span className="flex flex-row items-center">
              <Dot size={48} />
            </span>
            <h4 className="relative right-6 tracking-tighter  uppercase text-xs">
              {bannerContent.badgeLabel}
            </h4>
          </div>
          <span className="uppercase text-[clamp(1rem,4vw,8rem)] leading-[clamp(1rem,4vw,8rem)] font-bold tracking-tighter font-display">
            {bannerContent.title}
          </span>
          <p className="text-[clamp(1rem,1vw,8rem)] tracking-tighter leading-4">
            {bannerContent.description}
          </p>
        </div>
        {/*images*/}
        <div className="w-full md:h-96 h-12 md:absolute bottom-0 md:left-0 mt-12">
          <Image
            src={bannerContent.gradientImage}
            fill
            alt="banner-gradient"
            className="object-contain object-bottom-right"
          />
          <Image
            src={bannerContent.foregroundImage}
            fill
            alt="banner-image"
            className="object-contain object-bottom-right z-10"
          />
        </div>
      </div>
    </section>
  );
}
