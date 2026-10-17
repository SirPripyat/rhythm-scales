import { Soundfont } from 'smplr';

let context: AudioContext | null = null;
let guitar: Soundfont | null = null;

const getGuitar = () => {
  if (!context || !guitar) {
    context = new AudioContext();
    guitar = Soundfont(context, { instrument: 'acoustic_guitar_steel' });
  }

  return { context, guitar };
};

export const playGuitarNote = async (midiNote: number) => {
  const { context, guitar } = getGuitar();

  if (context.state === 'suspended') await context.resume();
  await guitar.ready;

  guitar.start({ note: midiNote });
};

export const playGuitarNotesInSequence = async (
  notes: number[],
  gapMs: number = 700,
  onDone?: () => void,
) => {
  const { context, guitar } = getGuitar();

  if (context.state === 'suspended') await context.resume();
  await guitar.ready;

  const startTime = context.currentTime;

  notes.forEach((note, index) => {
    guitar.start({ note, time: startTime + (gapMs * index) / 1000 });
  });

  if (onDone) {
    setTimeout(onDone, gapMs * (notes.length - 1) + 600);
  }
};
