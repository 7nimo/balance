import { useEffect, useRef } from 'react';

export function usePrevious<T> (value: T | undefined): [T | undefined, (val: T) => void] {
  const ref = useRef<T>();

  const setPrevious = (newValue: T | undefined): void => {
    ref.current = newValue;
  };

  useEffect(() => {
    setPrevious(value);
  });

  return [ref.current, setPrevious];
}
