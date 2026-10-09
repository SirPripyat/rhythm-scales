import { Radio, RadioGroup } from '@headlessui/react';
import { clsx } from 'clsx';
import { Label } from '@/components';
import { SelectField } from '@/components/SelectField.tsx';
import { useFretboardStore } from '@/stores';
import type { ScaleType } from '@/types';
import {
  FRET_OPTIONS,
  NOTE_LABELS,
  SCALE_TYPE_LABELS,
  TUNINGS_LABELS,
} from '@/utils';

export const ScaleExplorer = () => {
  const { root, scaleType, tuningKey, fretCount, configure } =
    useFretboardStore();

  return (
    <div className="flex flex-wrap items-end gap-6 rounded-3xl border border-white/[0.14] bg-white/5.5 p-5 backdrop-blur-xl">
      <RadioGroup
        value={root}
        onChange={(root) => configure({ root })}
        className={'flex flex-col gap-2'}
      >
        <Label>Tônica</Label>
        <div className={'flex gap-4'}>
          {Object.entries(NOTE_LABELS).map(([value, label]) => (
            <Radio
              key={label}
              value={Number(value)}
              className={clsx(
                'flex h-9.5 w-9.5 items-center justify-center rounded-xl font-mono text-[13px]',
                'border border-white/[0.14] bg-white/5.5 text-ink-dim backdrop-blur-[10px] transition-all',
                'cursor-pointer hover:bg-white/9 hover:text-ink hover:-translate-y-px',
                'data-checked:border-glow-teal/45 data-checked:bg-glow-teal/16 data-checked:text-ink',
                'focus:outline-none data-focus:outline data-focus:outline-white/40',
              )}
            >
              {label}
            </Radio>
          ))}
        </div>
      </RadioGroup>
      <SelectField
        label={'Escala'}
        value={scaleType}
        onChange={(value) => configure({ scaleType: value as ScaleType })}
        options={Object.entries(SCALE_TYPE_LABELS).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <SelectField
        label={'Afinação'}
        value={tuningKey}
        onChange={(value) => configure({ tuningKey: value })}
        options={Object.entries(TUNINGS_LABELS).map(([value, label]) => ({
          value,
          label,
        }))}
      />
      <SelectField
        label={'Qtd. Trastes'}
        value={fretCount}
        onChange={(value) => configure({ fretCount: value })}
        options={FRET_OPTIONS.map((fret) => ({
          value: fret,
          label: `${fret} trastes`,
        }))}
      />
    </div>
  );
};
