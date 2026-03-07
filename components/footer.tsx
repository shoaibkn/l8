import Link from "next/link";
import { footerContent } from "@/constants";

export default function Footer() {
  return (
    <section className="bg-primary grid md:grid-cols-4 h-36 text-primary-foreground font-mono px-6 md:px-12 text-xs tracking-tighter uppercase my-auto items-center relative z-[101]">
      <div className="flex flex-row gap-6">
        <Link
          href="/privacy-policy"
          className="hover:bg-primary-foreground hover:text-primary"
        >
          {footerContent.privacyLabel}
        </Link>
        <Link
          href="/terms-of-service"
          className="hover:bg-primary-foreground hover:text-primary"
        >
          {footerContent.termsLabel}
        </Link>
      </div>
      <div></div>
      <div className="text-right">
        {footerContent.copyright}
      </div>
    </section>
  );
}
