import type { Note } from '@/types';
import { NOTE_LABELS, toOptions } from '@/utils';
import { NoteBadgeButton } from './NoteBadgeButton';
import { NoteOptionsGrid } from './NoteOptionsGrid';

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
    <NoteOptionsGrid
      value={value}
      onChange={onChange}
      options={toOptions<Note>(NOTE_LABELS)}
      disabled={isDisabled}
    >
      <div className={'flex flex-col gap-2 items-center'}>
        <NoteBadgeButton
          colorClassName={LISTBOX_BUTTON_COLOR[status]}
          size={'lg'}
        >
          {value !== null ? NOTE_LABELS[value] : '?'}
        </NoteBadgeButton>

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
    </NoteOptionsGrid>
  );
};
