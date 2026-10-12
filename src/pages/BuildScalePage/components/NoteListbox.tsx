import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { clsx } from 'clsx';
import type { Note } from '@/types';
import { NOTE_LABELS } from '@/utils';

export type NoteListboxStatus = 'idle' | 'correct' | 'wrong' | 'tonic';

type NoteListboxProps = {
  value: Note | null;
  onChange: (value: Note) => void;
  status?: NoteListboxStatus;
  disabled?: boolean;
  index?: number;
};

const LISTBOX_BUTTON_COLOR: Record<NoteListboxStatus, string> = {
  idle: 'text-ink-faint',
  correct: 'border-glow-teal/60 bg-glow-teal/18 text-glow-teal',
  wrong: 'border-glow-rose/60 bg-glow-rose/18 text-glow-rose',
  tonic: 'bg-glow-amber text-ink-faint',
};

export const NoteListbox = ({
  value,
  onChange,
  status = 'idle',
  disabled = false,
  index,
}: NoteListboxProps) => {
  const isDisabled = disabled || status === 'correct' || status === 'tonic';

  return (
    <Listbox
      value={value === null ? undefined : value}
      onChange={onChange}
      disabled={isDisabled}
    >
      <div className={'flex flex-col gap-2 items-center'}>
        <ListboxButton
          className={clsx(
            'flex size-12 items-center justify-center rounded-full border font-mono text-[13px] font-bold',
            'backdrop-blur-[6px] transition cursor-pointer border-glass-border bg-glass  hover:bg-white/9',
            'data-open:border-white/26 data-disabled:pointer-events-none',
            LISTBOX_BUTTON_COLOR[status],
          )}
        >
          {value !== null ? NOTE_LABELS[value] : '?'}
        </ListboxButton>

        {index !== undefined && (
          <p
            className={
              'font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint'
            }
          >
            {status === 'tonic' ? 'Tônica' : `grau ${index + 1}`}
          </p>
        )}
      </div>

      <ListboxOptions
        anchor="bottom"
        className={clsx(
          'z-30 grid grid-cols-4 gap-1.5 rounded-2xl border border-white/26 p-2 bg-[rgba(18,16,30,0.92)]',
          'backdrop-blur-[28px] [--anchor-gap:8px] focus:outline-none',
        )}
      >
        {Object.entries(NOTE_LABELS).map(([value, label]) => (
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
