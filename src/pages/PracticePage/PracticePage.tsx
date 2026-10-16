import { PracticeCard } from '@/pages/PracticePage/components';

export const PracticePage = () => {
  return (
    <>
      <div className={'flex flex-col gap-3'}>
        <div className={'flex flex-col gap-1'}>
          <p
            className={
              'font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint'
            }
          >
            Praticar
          </p>
          <h1
            className={
              'text-balance font-display text-2xl font-bold text-ink sm:text-3xl'
            }
          >
            Escolha um jeito de treinar
          </h1>
        </div>

        <p className={'max-w-[65ch] text-sm text-ink-dim'}>
          Cada modo foca uma habilidade diferente. Construa escalas no braço,
          treine o ouvido, e em breve, intervalos e ritmo.
        </p>
      </div>

      <div className={'grid grid-cols-4 gap-4'}>
        <PracticeCard mode={'buildScale'} />
        <PracticeCard mode={'guessNote'} />
      </div>
    </>
  );
};
