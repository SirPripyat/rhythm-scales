export const toOptions = <T extends string>(
  labelRecord: Record<T, string | number>,
): { label: string; value: T }[] =>
  (Object.entries(labelRecord) as [T, string | number][]).map(
    ([value, label]) => ({
      value,
      label: String(label),
    }),
  );
