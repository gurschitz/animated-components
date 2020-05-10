import { useState, useRef, useEffect, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

export function useMeasure<T extends HTMLElement>(): [
  { ref: RefObject<T> },
  { left: number; top: number; width: number; height: number }
] {
  const ref = useRef<T>(null);
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ro]);
  return [{ ref }, bounds];
}
