import Banner from "@/components/banner";
import CaseStudy from "@/components/case-study";
import { ComponentExample } from "@/components/component-example";
import Hero from "@/components/hero";
import HowWeDoIt from "@/components/how-we-do-it";
import HowWeWork from "@/components/how-we-work";
import MoreProjects from "@/components/more-projects";
import Services from "@/components/services";
import ServiceList from "@/components/services-list";
import WhoWeAre from "@/components/who-we-are";
import WhyDelayHurts from "@/components/why-delay-hurts";
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
      <Banner />
      <HowWeDoIt />
      <WhyDelayHurts />
      <CaseStudy />
      <MoreProjects />

      {/*<HowWeWork />*/}
      {/*<HowWeWork />*/}
    </>
  );
}
