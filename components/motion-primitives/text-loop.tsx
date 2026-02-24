"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  Transition,
  Variants,
  AnimatePresenceProps,
} from "motion/react";
import { useState, useEffect, Children } from "react";

export type TextLoopProps = {
  children: React.ReactNode[];
  className?: string;
  interval?: number;
  transition?: Transition;
  variants?: Variants;
  onIndexChange?: (index: number) => void;
  trigger?: boolean;
  mode?: AnimatePresenceProps['mode'];
  onHover?: boolean;
  startIndex?: number;
  cycleTrigger?: number;
};

export function TextLoop({
  children,
  className,
  interval = 2,
  transition = { duration: 0.3 },
  variants,
  onIndexChange,
  trigger = true,
  mode = 'popLayout',
  onHover = false,
  startIndex = 0,
  cycleTrigger,
}: TextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isHovered, setIsHovered] = useState(false);
  const items = Children.toArray(children);

  useEffect(() => {
    if (cycleTrigger !== undefined && isHovered) {
      setCurrentIndex((current: number) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }
  }, [cycleTrigger, isHovered]);

  useEffect(() => {
    if (onHover || !trigger) return;

    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, trigger, onHover]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const motionVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  return (
    <div
      className={cn("relative inline-block whitespace-nowrap pointer-events-auto", className)}
      onMouseEnter={onHover ? handleMouseEnter : undefined}
      onMouseLeave={onHover ? handleMouseLeave : undefined}
    >
      <AnimatePresence mode={mode} initial={false}>
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants || motionVariants}
        >
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
