import { useRef } from "react";

export function useRefInSync<T>(
  value: T,
  onChange?: (value: T, prev: T) => void,
) {
  const ref = useRef<T>(value);
  if (ref.current !== value) {
    const oldValue = ref.current;
    ref.current = value;
    onChange?.(value, oldValue);
  }
  return ref;
}
