import { Dot } from "lucide-react";

export default function MoreProjects() {
  return (
    <section>
      <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center align-middle leading-4  md:px-12 px-6">
        <span className="flex flex-row items-center">
          <Dot className="" size={36} />
          {/*<span className="relative right-2">05</span>*/}
        </span>
        <h4 className="uppercase text-muted-foreground relative right-2">
          more projects
        </h4>
      </div>
    </section>
  );
}
