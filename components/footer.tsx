import Link from "next/link";

export default function Footer() {
  return (
    <section className="bg-primary grid md:grid-cols-4 h-36 text-primary-foreground font-mono px-6 md:px-12 text-xs tracking-tighter uppercase my-auto items-center relative z-[101]">
      <div className="flex flex-row gap-6">
        <Link
          href="/privacy-policy"
          className="hover:bg-primary-foreground hover:text-primary"
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-of-service"
          className="hover:bg-primary-foreground hover:text-primary"
        >
          Terms of Service
        </Link>
      </div>
      <div></div>
      <div className="text-right">
        © 2025 Lumin8 Studios. All rights reserved.
      </div>
    </section>
  );
}
