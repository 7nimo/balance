/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash';
import { useMemo } from 'react';

interface DebouncedFunc<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
}

export const useDebounce = (
  callback: (...args: any[]) => void,
  wait = 1000,
  ...deps: any[]
): DebouncedFunc<(...args: any[]) => void> => {
  const debounced = useMemo(() => debounce(callback, wait), [...deps]);

  return debounced;
};
