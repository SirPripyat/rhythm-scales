import { Listbox, ListboxOption, ListboxOptions } from '@headlessui/react';
import { clsx } from 'clsx';
import type { PropsWithChildren } from 'react';
import type { Note } from '@/types';

type NoteOptionsGridProps = PropsWithChildren & {
  value: Note | null;
  onChange: (value: Note) => void;
  disabled?: boolean;
  options: { label: string; value: Note }[];
};

export const NoteOptionsGrid = ({
  value,
  onChange,
  disabled,
  children,
  options,
}: NoteOptionsGridProps) => {
  return (
    <Listbox
      value={value === null ? undefined : value}
      onChange={onChange}
      disabled={disabled}
    >
      {children}

      <ListboxOptions
        anchor="bottom"
        className={clsx(
          'z-30 grid grid-cols-4 gap-1.5 rounded-2xl border border-white/26 p-2 bg-[rgba(18,16,30,0.92)]',
          'backdrop-blur-[28px] [--anchor-gap:8px] focus:outline-none',
        )}
      >
        {options.map(({ label, value }) => (
          <ListboxOption
            key={value}
            value={Number(value)}
            className={clsx(
              'flex size-9 cursor-pointer items-center justify-center rounded-lg font-mono text-[12px] text-ink-dim',
              'data-focus:bg-white/9 data-focus:text-ink',
            )}
          >
            {label}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
