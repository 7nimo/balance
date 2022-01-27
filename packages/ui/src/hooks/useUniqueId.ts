import { useRef } from 'react';

let uniqueId = 0;
// eslint-disable-next-line no-plusplus
const getUniqueId = (): number => uniqueId++;

export function useComponentId (): number | undefined {
  const idRef = useRef<number>();

  if (idRef.current === undefined) {
    idRef.current = getUniqueId();
  }

  return idRef.current;
}
