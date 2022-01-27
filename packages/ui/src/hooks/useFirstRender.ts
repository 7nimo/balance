import { useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFirstRender = () => {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
};
