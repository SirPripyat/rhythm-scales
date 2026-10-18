import { RadioGroup as HeadlessRadioGroup, Radio } from '@headlessui/react';
import { clsx } from 'clsx';
import { Label } from './Label';

type SegmentedControlProps<V extends string | number> = {
  value: V;
  onChange: (value: V) => void;
  label: string;
  options: { label: string; value: V }[];
  className?: string;
};

export const SegmentedControl = <V extends string | number>({
  label,
  value,
  onChange,
  options,
  className,
}: SegmentedControlProps<V>) => {
  return (
    <HeadlessRadioGroup
      className={clsx('flex flex-col gap-2', className)}
      value={value}
      onChange={onChange}
    >
      <Label>{label}</Label>

      <div
        className={
          'inline-flex justify-center items-center gap-1 px-1 h-10 rounded-2xl border border-glass-border bg-glass'
        }
      >
        {options.map((option) => (
          <Radio
            value={option.value}
            key={option.value}
            className={clsx(
              'flex justify-center items-center font-body text-[13px] font-semibold transition cursor-pointer',
              'rounded-xl px-3 h-8',
              value === option.value
                ? 'bg-glow-teal/24 text-ink'
                : 'text-ink-faint',
            )}
          >
            {option.label}
          </Radio>
        ))}
      </div>
    </HeadlessRadioGroup>
  );
};
