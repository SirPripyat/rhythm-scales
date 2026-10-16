type SwatchProps = {
  label: string;
  isTonic?: boolean;
};

export const Swatch = ({ label, isTonic = false }: SwatchProps) => (
  <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-dim">
    <span
      className={`h-2.5 w-2.5 rounded-full ${
        isTonic ? 'bg-glow-amber' : 'bg-glow-teal'
      }`}
    />
    {label}
  </span>
);
