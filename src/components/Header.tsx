import { clsx } from 'clsx';
import { NavLink, useMatch } from 'react-router';

const tabClass = ({ isActive }: { isActive: boolean }) =>
  `relative z-10 rounded-full px-5 py-2 text-center text-sm font-semibold transition-colors duration-500 ${
    isActive ? 'text-on-amber' : 'text-ink-faint hover:text-ink-dim'
  }`;

export const Header = () => {
  const isHome = useMatch('/') !== null;

  return (
    <header className="flex flex-wrap items-center justify-between gap-5">
      <h1
        className={clsx(
          'text-balance bg-linear-to-r from-white from-40% via-glow-violet via-78%',
          'to-white to-40% bg-clip-text font-display text-3xl font-bold text-transparent',
          'sm:text-4xl md:text-5xl',
        )}
      >
        Scalewise
      </h1>

      <nav className="relative grid grid-cols-2 rounded-full border border-glass-border bg-glass p-1 backdrop-blur-sm">
        <span
          aria-hidden
          className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-glow-amber shadow-root transition-transform duration-500 ease-out motion-reduce:transition-none ${
            isHome ? 'translate-x-0' : 'translate-x-full'
          }`}
        />

        <NavLink to="/" end className={tabClass}>
          Escala
        </NavLink>
        <NavLink to="/practice" end className={tabClass}>
          Praticar
        </NavLink>
      </nav>
    </header>
  );
};
