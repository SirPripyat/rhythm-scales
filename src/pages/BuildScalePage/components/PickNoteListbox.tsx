import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { clsx } from 'clsx';
import type { Note } from '@/types';
import { NOTE_LABELS } from '@/utils';

type NoteStatus = 'idle' | 'correct' | 'wrong';

type PickNoteListboxProps = {
  value: Note | null;
  onChange: (value: Note) => void;
  onClear?: () => void;
  options: Note[];
  status?: NoteStatus;
  disabled?: boolean;
};

const LISTBOX_BUTTON_COLOR: Record<NoteStatus, string> = {
  idle: 'border-glow-teal/45 bg-glow-teal/38 text-ink text-shadow-note',
  correct: 'border-glow-teal/70 bg-glow-teal/55 text-ink text-shadow-note',
  wrong: 'border-glow-rose/60 bg-glow-rose/18 text-glow-rose',
};

export const PickNoteListbox = ({
  value,
  onChange,
  onClear,
  options,
  status = 'idle',
  disabled,
}: PickNoteListboxProps) => {
  const isDisabled = disabled || status === 'correct';

  return (
    <Listbox
      value={value === null ? undefined : value}
      onChange={onChange}
      disabled={isDisabled}
    >
      {value !== undefined && value !== null ? (
        <>
          <ListboxButton
            className={clsx(
              'z-3 flex size-8 items-center justify-center rounded-full border font-mono text-[13px] font-bold',
              'backdrop-blur-[6px] transition cursor-pointer border-glass-border bg-glass  hover:bg-white/9',
              'data-open:border-white/26 data-disabled:pointer-events-none',
              LISTBOX_BUTTON_COLOR[status],
            )}
          >
            {NOTE_LABELS[value]}
          </ListboxButton>

          {status !== 'correct' && onClear && (
            <button
              type="button"
              aria-label="Limpar resposta"
              onClick={(event) => {
                event.stopPropagation();
                onClear();
              }}
              className={clsx(
                'absolute -right-1 -top-1 z-4 flex size-4 items-center justify-center rounded-full',
                'border border-glass-border bg-void text-[10px] text-ink-faint transition hover:text-glow-rose',
              )}
            >
              ×
            </button>
          )}
        </>
      ) : (
        <ListboxButton
          className={clsx('cursor-pointer absolute inset-0 hover:bg-white/9')}
        >
          {''}
        </ListboxButton>
      )}

      <ListboxOptions
        anchor="bottom"
        className={clsx(
          'z-30 grid grid-cols-4 gap-1.5 rounded-2xl border border-white/26 p-2 bg-[rgba(18,16,30,0.92)]',
          'backdrop-blur-[28px] [--anchor-gap:8px] focus:outline-none',
        )}
      >
        {options.map((note) => (
          <ListboxOption
            key={note}
            value={note}
            className={clsx(
              'flex size-9 cursor-pointer items-center justify-center rounded-lg font-mono text-[12px] text-ink-dim',
              'data-focus:bg-white/9 data-focus:text-ink',
            )}
          >
            {NOTE_LABELS[note]}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};
