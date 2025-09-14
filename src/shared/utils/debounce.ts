type DebounceFn = (
  cb: () => void,
  delayMillis: number
) => { cancel: () => void };

export type DebouncedFunction = ReturnType<DebounceFn>;

export const debounce: DebounceFn = (cb, delayMillis) => {
  const ref = setTimeout(cb, delayMillis);

  return { cancel: () => clearTimeout(ref) };
};
