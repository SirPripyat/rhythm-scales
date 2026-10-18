import { RadioGroup, SegmentedControl, SelectField } from '@/components';
import { FRET_OPTIONS, MAX_FRET } from '@/constants';
import type { Note, ScaleType } from '@/types';
import {
  NOTE_LABELS,
  SCALE_TYPE_LABELS,
  TUNINGS_LABELS,
  toOptions,
} from '@/utils';
import { useFretboardStore } from '../stores';
import { FRETBOARD_VIEW_MODE_LABELS } from '../utils';

const fretRangeOptions = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => ({
    value: from + i,
    label: String(from + i),
  }));

export const ScaleExplorer = () => {
  const {
    config: {
      root,
      scaleType,
      tuningKey,
      fretCount,
      viewMode,
      fretRangeStart,
      fretRangeEnd,
    },
    configure,
  } = useFretboardStore();

  return (
    <div
      className={
        'flex flex-col gap-6 rounded-3xl border border-glass-border bg-glass p-4 backdrop-blur-xl sm:p-5'
      }
    >
      <div className="flex flex-wrap items-end gap-4 sm:gap-6">
        <RadioGroup
          value={root}
          onChange={(value) => configure({ root: value as Note })}
          label={'Tônica'}
          options={toOptions(NOTE_LABELS)}
        />

        <SelectField
          label={'Escala'}
          value={scaleType}
          onChange={(value) => configure({ scaleType: value as ScaleType })}
          options={toOptions(SCALE_TYPE_LABELS)}
        />

        <SelectField
          label={'Afinação'}
          value={tuningKey}
          onChange={(value) => configure({ tuningKey: value })}
          options={toOptions(TUNINGS_LABELS)}
        />
      </div>

      <div className={'flex flex-wrap gap-4'}>
        <SegmentedControl
          label={'Modo de visualização'}
          value={viewMode}
          onChange={(v) => configure({ viewMode: v })}
          options={toOptions(FRETBOARD_VIEW_MODE_LABELS)}
        />

        {viewMode === 'count' ? (
          <SelectField
            label={'Qtd. Trastes'}
            value={fretCount}
            onChange={(value) => configure({ fretCount: value })}
            options={FRET_OPTIONS.map((fret) => ({
              value: fret,
              label: `${fret} trastes`,
            }))}
          />
        ) : (
          <>
            <SelectField
              label="De"
              value={fretRangeStart}
              onChange={(v) =>
                configure({
                  fretRangeStart: v,
                  fretRangeEnd: Math.max(v, fretRangeEnd),
                })
              }
              options={fretRangeOptions(1, fretRangeEnd)}
              className={'w-20'}
            />
            <SelectField
              label="Até"
              value={fretRangeEnd}
              onChange={(v) =>
                configure({
                  fretRangeEnd: v,
                  fretRangeStart: Math.min(v, fretRangeStart),
                })
              }
              options={fretRangeOptions(fretRangeStart, MAX_FRET)}
              className={'w-20'}
            />
          </>
        )}
      </div>
    </div>
  );
};
