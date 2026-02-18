"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";
import Image from "next/image";

type ServiceComponentProps = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

export default function ServiceComponent(props: ServiceComponentProps) {
  const { id, title, description, image, tags } = props;
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="p-4 border-b border-muted-foreground/50">
        {/*top*/}
        <div className="flex flex-row justify-between w-full pb-6">
          <h2 className="uppercase font-display text-lg font-semibold wrap-normal">
            {title}
          </h2>
          <span className="font-display font-semibold text-2xl text-muted-foreground">
            /{id}
          </span>
        </div>
        {/*image*/}
        <div className="w-full h-96 border-primary/50  border-12 p-4 rounded-4xl relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-xl border border-muted-foreground/50 border-0.5"
          />
        </div>

        <p className="w-full text-sm py-6">{description}</p>
        <div className="flex flex-row gap-4 flex-wrap italic text-xs py-6">
          {tags.map((tag) => (
            <span key={tag} className="">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex flex-row justify-between w-full">
          <Plus size={12} className="relative right-5.5 top-5.5" />
          <Plus size={12} className="relative left-5.5 top-5.5" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-muted-foreground/50 grid grid-cols-4 items-center h-64 z-20">
      <span className="font-display font-semibold text-2xl text-muted-foreground pl-4">
        /{id}
      </span>
      <h2 className="uppercase font-display text-lg font-semibold relative right-6">
        {title}
      </h2>
      <div className="h-48 rounded-4xl relative overflow-hidden mx-3 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="relative left-6 w-full max-w-56 p-4">
        <p className="text-sm">{description}</p>
        <div className="flex flex-row gap-4 flex-wrap italic text-xs mt-4">
          {tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
