export default function Figures({
  figure1,
  figure2,
}: {
  figure1: string;
  figure2: string;
}) {
  return (
    <span className="flex flex-row gap-2 items-center">
      <h1 className="text-3xl font-display font-semibold">{figure1}</h1>
      <span className="uppercase tracking-tighter leading-3 text-muted-foreground text-[10px] w-12">
        {figure2}
      </span>
    </span>
  );
}
