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

export const playGuitarNote = (midiNote: number) => {
  const { context, guitar } = getGuitar();

  if (context.state === 'suspended') void context.resume();

  guitar.start({ note: midiNote });
};
