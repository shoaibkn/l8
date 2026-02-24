import Banner from "@/components/banner";
import NoSales from "@/components/banner-2";
import CaseStudy from "@/components/case-study";
import { ComponentExample } from "@/components/component-example";
import ContactUs from "@/components/contact-us";
import Faq from "@/components/faq";
import FirstStep from "@/components/first-step";
import GetInTouch from "@/components/get-in-touch";
import Header from "@/components/header";
import Hero from "@/components/hero";
import HowWeDoIt from "@/components/how-we-do-it";
import HowWeWork from "@/components/how-we-work";
import MoreProjects from "@/components/more-projects";
import Nav from "@/components/nav";
import News from "@/components/news";
import Newsletter from "@/components/newsletter";
import Services from "@/components/services";
import ServiceList from "@/components/services-list";
import WhoWeAre from "@/components/who-we-are";
import WhyDelayHurts from "@/components/why-delay-hurts";
import WhyUs from "@/components/why-us";
import WhyUsBanner from "@/components/why-us-banner";

export default function Page() {
  return (
    <>
      {/*<Nav />*/}

      <Header />
      <Hero />
      <div className="bg-primary/90 md:grid md:grid-cols-4 flex flex-col md:justify-between w-full px-6 md:px-12">
        <HowWeWork />
        <div className="hidden md:block"></div>
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
      <FirstStep />
      <NoSales />
      <WhyUsBanner />
      <News />
      <Newsletter />
      <Faq />
      <ContactUs />
      <GetInTouch />
      {/*<HowWeWork />*/}
      {/*<HowWeWork />*/}
    </>
  );
}
