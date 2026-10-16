import { Note } from '@/types';
import { getScaleNotes, NOTE_SOLFEGE_LABELS } from '@/utils';
import type { GuessNoteDegree } from '../types';

type DiatonicNote = Exclude<
  Note,
  | typeof Note.Cs
  | typeof Note.Ds
  | typeof Note.Fs
  | typeof Note.Gs
  | typeof Note.As
>;

const SOLFEGE_HINTS: Record<DiatonicNote, string> = {
  [Note.C]: 'casa, repouso',
  [Note.D]: 'passagem, sobe',
  [Note.E]: 'doce, suave',
  [Note.F]: 'tensão leve',
  [Note.G]: 'estável, aberto',
  [Note.A]: 'nostálgica',
  [Note.B]: 'tensa, quer resolver',
};

export const GUESS_NOTE_DEGREES: GuessNoteDegree[] = getScaleNotes(
  Note.C,
  'major',
).map(({ pitchClass }) => ({
  note: pitchClass,
  label: NOTE_SOLFEGE_LABELS[pitchClass],
  hint: SOLFEGE_HINTS[pitchClass as DiatonicNote],
}));

export const pickMysteryNote = (pool: Note[], exclude?: Note | null): Note => {
  const randomNote = pool[Math.floor(Math.random() * pool.length)];

  if (randomNote === exclude && pool.length > 1) {
    return pickMysteryNote(pool, exclude);
  }

  return randomNote;
};
