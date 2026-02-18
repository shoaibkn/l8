import { advantages } from "@/constants";
import AdvantageComponent from "./advantage-component";

export default function AdvantagesList() {
  return (
    <section className="">
      {advantages.map((advantage) => (
        <AdvantageComponent key={advantage.id} {...advantage} />
      ))}
    </section>
  );
}
