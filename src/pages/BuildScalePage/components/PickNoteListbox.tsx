import { ListboxButton } from '@headlessui/react';
import { clsx } from 'clsx';
import type { Note } from '@/types';
import { NOTE_LABELS } from '@/utils';
import { NoteBadgeButton } from './NoteBadgeButton';
import { NoteOptionsGrid } from './NoteOptionsGrid';

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
    <NoteOptionsGrid
      value={value}
      onChange={onChange}
      options={options.map((option) => ({
        label: NOTE_LABELS[option],
        value: option,
      }))}
      disabled={isDisabled}
    >
      {value !== undefined && value !== null ? (
        <>
          <NoteBadgeButton
            size={'sm'}
            colorClassName={LISTBOX_BUTTON_COLOR[status]}
          >
            {NOTE_LABELS[value]}
          </NoteBadgeButton>

          {status !== 'correct' && onClear && (
            <button
              type="button"
              aria-label="Limpar resposta"
              onClick={(event) => {
                event.stopPropagation();
                onClear();
              }}
              className={clsx(
                'cursor-pointer absolute -right-1 -top-1 z-4 flex size-4 items-center justify-center rounded-full',
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
    </NoteOptionsGrid>
  );
};
