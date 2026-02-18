import { ComponentExample } from "@/components/component-example";
import Hero from "@/components/hero";
import HowWeWork from "@/components/how-we-work";
import Services from "@/components/services";
import ServiceList from "@/components/services-list";
import WhoWeAre from "@/components/who-we-are";
import WhyUs from "@/components/why-us";

export default function Page() {
  return (
    <>
      <Hero />
      <div className="bg-primary/90 flex md:flex-row flex-col md:justify-between">
        <HowWeWork />
        <WhoWeAre />
      </div>
      <Services />
      <ServiceList />
      <WhyUs />
      {/*<HowWeWork />*/}
      {/*<HowWeWork />*/}
    </>
  );
}
