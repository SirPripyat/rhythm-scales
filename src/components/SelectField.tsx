import {
  Field,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { clsx } from 'clsx';
import { Label } from '@/components';

export type SelectOption<V extends string | number> = {
  value: V;
  label: string;
};

type SelectFieldProps<V extends string | number> = {
  label: string;
  value: V;
  options: SelectOption<V>[];
  onChange: (value: V) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const buttonStyles = clsx(
  'group flex h-10 cursor-pointer items-center justify-between gap-2',
  'rounded-lg bg-wood-surface-2 px-3 py-2 text-sm text-ink shadow-md',
  'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white',
  'data-disabled:cursor-not-allowed data-disabled:opacity-50',
);

const iconStyles = clsx(
  'size-4 shrink-0 fill-ink-dim transition-transform',
  'group-data-open:rotate-180',
);

const optionsStyles = clsx(
  'z-3 w-(--button-width) rounded-lg bg-wood-surface-2 p-1 shadow-md',
  '[--anchor-gap:12px] focus:outline-none',
);

const optionStyles = clsx(
  'cursor-pointer rounded-md px-3 py-1.5 text-sm text-ink-dim',
  'data-focus:bg-wood-surface data-selected:bg-accent data-selected:text-ink',
);

export const SelectField = <V extends string | number>({
  label,
  value,
  options,
  onChange,
  placeholder = 'Selecione',
  disabled,
  className,
}: SelectFieldProps<V>) => {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Field
      className={clsx('flex flex-col gap-2', className)}
      disabled={disabled}
    >
      <Label>{label}</Label>

      <Listbox value={value} onChange={onChange}>
        <ListboxButton className={buttonStyles}>
          <span className="truncate">
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDownIcon className={iconStyles} aria-hidden="true" />
        </ListboxButton>

        <ListboxOptions anchor="bottom" className={optionsStyles}>
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={optionStyles}
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};
