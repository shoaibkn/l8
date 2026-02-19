import { cn } from "@/lib/utils";

export default function DelayProgressComponent({
  id,
  title,
  description,
  percentage,
  tag,
}: {
  id: string;
  title: string;
  description: string;
  percentage: number;
  tag: string;
}) {
  return (
    <>
      <div className="w-full border-primary/10 bg-accent/50 hidden lg:flex flex-row justify-between items-center pr-4">
        <div
          className={`bg-white h-18 w-[${percentage}%] flex flex-row justify-between p-2 items-center align-middle rounded-r-full`}
        >
          <div className="flex flex-row gap-4 pl-4 items-center uppercase">
            <h1 className="font-mono text-muted-foreground text-xs">{id}/</h1>
            <div className="flex flex-row gap-1 text-xs ">
              <div className="text-muted-foreground">{title}</div>
              <div>{description}</div>
            </div>
          </div>
          <div className="bg-primary h-full w-24 rounded-full text-primary-foreground font-display text-lg font-bold shadow-lg flex flex-row justify-center items-center">
            +{percentage}%
          </div>
        </div>
        <span className="uppercase text-xs text-muted-foreground">/{tag}</span>
      </div>

      <div
        className={`w-full border-primary/10 bg-linear-to-r from-white from-[${percentage}%] to-accent/50 to-30% flex flex-row justify-between items-center lg:hidden`}
      >
        <div
          className={` h-18 w-full flex flex-row justify-between p-2 items-center align-middle rounded-r-full`}
        >
          <div className="flex flex-row gap-4 pl-4 items-center uppercase">
            <h1 className="font-mono text-muted-foreground text-xs h-full flex flex-col items-start">
              {id}/
            </h1>
            <div className="flex flex-col gap-1 text-xs font-semibold tracking-tighter">
              <div className="text-muted-foreground">{title}</div>
              <div>{description}</div>
            </div>
          </div>
          <div className="bg-primary h-full w-24 rounded-full text-primary-foreground font-display text-lg font-bold shadow-2xl flex flex-row justify-center items-center">
            +{percentage}%
          </div>
        </div>
      </div>
    </>
  );
}
