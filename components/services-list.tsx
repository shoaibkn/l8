import { services } from "@/constants";
import ServiceComponent from "./services-component";

export default function ServiceList() {
  return (
    <section className="relative isolate z-50 max-w-screen flex flex-col flex-wrap justify-between bg-primary/90 md:px-12 px-6 text-primary-foreground">
      {services.map((service) => (
        <ServiceComponent key={service.id} {...service} />
      ))}
    </section>
  );
}
