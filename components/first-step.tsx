import { Dot, Plus } from "lucide-react";

export default function FirstStep() {
  return (
    <section>
      {/*https://framerusercontent.com/images/JnRAJ4vvnZTxBbXZlMvnebY2VAI.jpg?width=1921&height=1080*/}
      {/*https://framerusercontent.com/images/WUUPhafYRtsHvBgbLAyfOIZCV0.png?width=746&height=1203*/}
      <div className="flex absolute flex-row justify-between w-full text-primary-foreground">
        <Plus size={12} className="relative md:left-10.5 left-4.5 top-6.5" />
        <Plus size={12} className="relative md:right-10.5 right-4.5 top-6.5" />
      </div>
      <div className="h-px w-full border-t-[0.5px] border-primary-foreground/10 relative top-8"></div>
      <div className="md:px-12 px-6 pt-24 bg-[url('https://framerusercontent.com/images/JnRAJ4vvnZTxBbXZlMvnebY2VAI.jpg')] bg-cover bg-center bg-no-repeat w-full h-full min-h-[800px] md:grid md:grid-cols-2 flex flex-col-reverse">
        <div className="bg-[url('https://framerusercontent.com/images/WUUPhafYRtsHvBgbLAyfOIZCV0.png')] bg-contain bg-bottom-left bg-no-repeat w-full h-full mx-auto col-span-1 min-h-[600px]"></div>
        <div className="text-primary-foreground flex flex-col gap-12 justify-center">
          <div className="flex w-full flex-row gap-4 relative right-4 text-xs font-mono tracking-tighter items-center align-middle leading-4">
            <span className="flex flex-row items-center">
              <Dot className="" size={36} />
              <span className="relative right-2">04</span>
            </span>
            <h4 className="uppercase text-primary-foreground/80 relative right-2">
              easy first step
            </h4>
          </div>
          <h1 className="font-display w-full wrap-break-word leading-[clamp(2rem,4vw,6rem)] uppercase text-[clamp(3rem,4vw,8rem)] font-semibold tracking-tighter">
            Start Smart, Start Small
          </h1>
          <div className="border-l w-1/2 h-48 pl-6 flex flex-col justify-between">
            <p className="leading-[clamp(1rem,1.5vw,2rem)] text-[clamp(1rem,1.5vw,2rem)] tracking-tighter">
              Pick one routine task. We’ll automate it end-to-end and keep
              everything else unchanged.
            </p>
            <span className="uppercase text-xs text-primary-foreground/50">
              <p>Jessia Burns</p>
              <p>client success manager</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
