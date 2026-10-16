import { clsx } from 'clsx';

type SectionIntroProps = {
  title: string;
  description: string;
  eyebrow: string;
  glowColor: 'amber' | 'teal' | 'violet' | 'pink' | 'indigo' | 'rose';
};

export const SectionIntro = ({
  title,
  eyebrow,
  glowColor,
  description,
}: SectionIntroProps) => {
  return (
    <div className="max-w-xl">
      <p
        className={clsx(
          'font-mono text-[11px] uppercase tracking-[0.14em]',
          `text-glow-${glowColor}`,
        )}
      >
        {eyebrow}
      </p>

      <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.1rem)] font-bold text-ink mt-1 mb-1.5">
        {title}
      </h2>

      <p className="text-ink-dim text-sm leading-[1.55] max-w-lg">
        {description}
      </p>
    </div>
  );
};
