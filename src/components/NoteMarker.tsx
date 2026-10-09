import type { FretboardPosition } from '@/types';
import { noteNameFromPitchClass } from '@/utils';

type NoteMarkerProps = {
  scale?: FretboardPosition;
  openNoteName?: number;
  fret: number;
  midiNote: number;
  playNote: (note: number) => void;
};

export const NoteMarker = ({
  scale,
  openNoteName,
  fret,
  midiNote,
  playNote,
}: NoteMarkerProps) => {
  if (fret === 0 && openNoteName !== undefined && !scale)
    return (
      <div
        className={`z-2 rounded-full h-8 w-8 flex items-center justify-center`}
      >
        {noteNameFromPitchClass(openNoteName)}
      </div>
    );

  if (!scale) return null;

  return (
    <button
      onClick={() => playNote(midiNote)}
      type={'button'}
      className={`cursor-pointer z-2 rounded-full h-8 w-8 flex items-center justify-center ${scale?.isRoot ? 'bg-accent' : 'bg-degree'}`}
    >
      {scale?.noteName}
    </button>
  );
};
