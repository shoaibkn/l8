export default function GridColumns() {
  return (
    <div className="fixed px-6 md:px-12 inset-0 pointer-events-none z-1 flex w-full h-full opacity-30 mix-blend-difference">
      <div className="absolute left-6 md:left-12 h-full w-px bg-white/20" />
      <div className="w-[calc(100%/4)] h-full border-r border-white/20" />
      <div className="w-[calc(100%/4)] h-full border-r border-white/20" />
      <div className="w-[calc(100%/4)] h-full border-r border-white/20" />
      <div className="w-[calc(100%/4)] h-full border-r border-white/20" />
      <div className="absolute right-6 md:right-12 h-full w-px bg-white/20" />
    </div>
  );
}

// will-change-transform mix-blend-difference text-white
