import { delays } from "@/constants";
import DelayProgressComponent from "./delay-progress-component";

export default function DelayProgressContainer() {
  return (
    <div className="w-full flex flex-col gap-2">
      {delays.map((delay) => (
        <DelayProgressComponent
          key={delay.id}
          id={delay.id}
          title={delay.title}
          description={delay.description}
          percentage={delay.percentage}
          tag={delay.tag}
        />
      ))}
    </div>
  );
}
