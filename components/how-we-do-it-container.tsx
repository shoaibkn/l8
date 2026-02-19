import { howWeDoIt } from "@/constants";
import HowWeDoItComponent from "./how-we-do-it-component";

export default function HowWeDoItContainer() {
  return (
    <div className="grid md:grid-cols-2 md:w-[calc((100dvw-96px)/2)] isolate z-50 relative">
      {howWeDoIt.map((item) => (
        <HowWeDoItComponent key={item.id} id={item.id} text={item.text} />
      ))}
    </div>
  );
}
