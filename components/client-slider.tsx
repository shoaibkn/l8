import { InfiniteSlider } from "./ui/infinite-slider";
import { ProgressiveBlur } from "./ui/progressive-blur";

export function ClientProgressiveBlurSlider() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <InfiniteSlider className="flex h-full w-full items-center">
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          1
        </div>
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          2
        </div>
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          3
        </div>
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          4
        </div>
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          5
        </div>
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          6
        </div>
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          7
        </div>
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          8
        </div>
        <div className="w-32 text-center text-4xl font-[450] text-black dark:text-white">
          9
        </div>
      </InfiniteSlider>
      <ProgressiveBlur
        className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
        direction="left"
        blurIntensity={1}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
        direction="right"
        blurIntensity={1}
      />
    </div>
  );
}
