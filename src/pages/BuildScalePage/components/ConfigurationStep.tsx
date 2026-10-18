import { Button, RadioGroup, SelectField } from '@/components';
import { FRET_OPTIONS } from '@/constants';
import { useGameStore } from '@/stores';
import type { Note, ScaleType } from '@/types';
import { NOTE_LABELS, SCALE_TYPE_LABELS, toOptions } from '@/utils';
import { StepCard } from './StepCard';

export const ConfigurationStep = () => {
  const {
    config: { root, scaleType, fretCount },
    configure,
    progress: { configConfirmed },
    confirmConfig,
  } = useGameStore();

  return (
    <StepCard
      status={configConfirmed ? 'checked' : 'inProgress'}
      title={'Configuração'}
      index={1}
    >
      <div className={'flex flex-wrap items-end gap-6'}>
        <RadioGroup
          value={root}
          onChange={(root) => configure({ root: root as Note })}
          label={'Tônica'}
          options={toOptions(NOTE_LABELS)}
        />

        <SelectField
          value={scaleType}
          onChange={(value) => configure({ scaleType: value as ScaleType })}
          label={'Escala'}
          options={toOptions(SCALE_TYPE_LABELS)}
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

      <div className={'flex flex-wrap items-center justify-end gap-4'}>
        <Button
          onClick={confirmConfig}
          disabled={configConfirmed}
          hierarchy={'primary'}
        >
          Confirmar
        </Button>
      </div>
    </StepCard>
  );
};
