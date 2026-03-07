"use client";
import { useState } from "react";
import { ChevronRight, Dot } from "lucide-react";
import { Button } from "./ui/button";
import { TextRoll } from "./motion-primitives/text-roll";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { contactUsContent } from "@/constants";

function TextRollButton({
  children,
  className,
  variant,
  disabled,
  onClick,
  style,
  type = "button",
}: {
  children: string;
  className?: string;
  variant?: "link";
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}) {
  const [hoverKey, setHoverKey] = useState(0);

  return (
    <Button
      type={type}
      className={className}
      variant={variant}
      onMouseEnter={() => setHoverKey((k) => k + 1)}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      <TextRoll key={hoverKey} duration={0.1}>
        {children}
      </TextRoll>
      <ChevronRight />
    </Button>
  );
}

export default function ContactUs() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError(contactUsContent.submitError);
      }
    } catch {
      setError(contactUsContent.unexpectedError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="bg-accent px-6 md:px-12 grid md:grid-cols-4 py-36 md:gap-0 gap-6">
        <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center h-fit align-middle leading-4  ">
          <span className="flex flex-row items-center">
            <Dot className="" size={36} />
            <span className="relative right-2">
              {contactUsContent.sectionNumber}
            </span>
          </span>
          <h4 className="uppercase text-muted-foreground relative right-2">
            {contactUsContent.sectionLabel}
          </h4>
        </div>
        <div className="flex flex-col gap-12">
          <h1 className="font-display w-full wrap-break-word leading-[clamp(2rem,3vw,6rem)] uppercase text-primary text-[clamp(2rem,3vw,8rem)] font-semibold tracking-tighter">
            {contactUsContent.successTitle}
          </h1>
          <p className="text-lg">{contactUsContent.successMessage}</p>
          <Button variant="link" onClick={() => setSubmitted(false)}>
            {contactUsContent.sendAnotherLabel}
          </Button>
        </div>
        <div></div>
        <div></div>
      </section>
    );
  }

  return (
    <section className="bg-accent px-6 md:px-12 grid md:grid-cols-4 py-36 md:gap-0 gap-6">
      <div className="flex flex-row gap-4 relative right-2 text-xs font-mono tracking-tighter items-center h-fit align-middle leading-4  ">
        <span className="flex flex-row items-center">
          <Dot className="" size={36} />
          <span className="relative right-2">
            {contactUsContent.sectionNumber}
          </span>
        </span>
        <h4 className="uppercase text-muted-foreground relative right-2">
          {contactUsContent.sectionLabel}
        </h4>
      </div>
      <div className="flex flex-col gap-12">
        <h1 className="font-display w-full wrap-break-word leading-[clamp(2rem,3vw,6rem)] uppercase text-primary text-[clamp(2rem,3vw,8rem)] font-semibold tracking-tighter">
          {contactUsContent.title}
        </h1>
        {!isOpen ? (
          <TextRollButton
            className="uppercase bg-primary/5 rounded-none w-full h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
            variant={"link"}
            onClick={() => setIsOpen(true)}
            style={{
              backgroundImage:
                "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)",
              backgroundSize: "100% 2px",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
            }}
          >
            {contactUsContent.ctaAskQuestion}
          </TextRollButton>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder={contactUsContent.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background"
            />
            <Input
              type="email"
              placeholder={contactUsContent.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
            <Textarea
              placeholder={contactUsContent.messagePlaceholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background min-h-25"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2">
              <TextRollButton
                type="submit"
                className="uppercase bg-primary/5 rounded-none w-full h-18 flex flex-row justify-between px-6 font-display border-0.5 border-b  isolate z-50 relative border-black"
                variant={"link"}
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6, #22c55e, #eab308, #f97316, #ef4444)",
                  backgroundSize: "100% 2px",
                  backgroundPosition: "bottom",
                  backgroundRepeat: "no-repeat",
                }}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? contactUsContent.submittingLabel
                  : contactUsContent.submitLabel}
              </TextRollButton>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                {contactUsContent.cancelLabel}
              </Button>
            </div>
          </form>
        )}
      </div>
      <div></div>
      <div>{contactUsContent.supportNote}</div>
    </section>
  );
}
