import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewsContainer({
  date,
  image,
  link,
  title,
  height,
}: {
  date: string;
  image: string;
  link: string;
  title: string;
  height: string;
}) {
  return (
    <Link
      href={link}
      className={`relative w-full flex flex-col justify-start gap-0 border-t md:border-none border-primary/20 border-0.5`}
    >
      <div className="flex w-full flex-row gap-4 relative text-xs font-mono tracking-tighter items-center right-4 leading-4">
        <span className="flex flex-row items-center">
          <Dot className="" size={36} />
          <span className="relative right-2">07</span>
        </span>
        <h4 className="uppercase relative right-2">{date}</h4>
      </div>
      <Image
        src={image}
        alt={title}
        width={800}
        height={450}
        className="w-full h-auto"
      />
      <div className="p-2 font-display mb-8">{title}</div>
    </Link>
  );
}
