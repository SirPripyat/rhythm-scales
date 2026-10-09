import { clsx } from 'clsx';

export const AmbientBackground = () => {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        'pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void',
        'before:absolute before:inset-[-10%] before:bg-ambient-glow before:blur-[60px]',
        'before:animate-drift motion-reduce:before:animate-none',
        'after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:to-void-2 after:opacity-70',
      )}
    />
  );
};
