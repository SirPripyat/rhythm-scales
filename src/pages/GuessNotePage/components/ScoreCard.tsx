type ScoreCardProps = {
  label: string;
  result: string;
};

export const ScoreCard = ({ label, result }: ScoreCardProps) => {
  return (
    <div
      className={
        'rounded-xl bg-glass border border-glass-border flex flex-col items-center justify-center font-mono h-16 w-24'
      }
    >
      <h3 className={'text-glow-teal font-semibold text-[1.15rem]'}>
        {result}
      </h3>
      <p className={'uppercase text-[.62rem] text-ink-faint tracking-[.08em]'}>
        {label}
      </p>
    </div>
  );
};
