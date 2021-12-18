import { useCallback, useEffect, useRef, useState } from 'react';

interface State {
  readonly width: number;
  readonly height: number;
}

interface Observe<T> {
  (element?: T | null): void;
}

interface Event<T> extends State {
  readonly entry: ResizeObserverEntry;
  observe: Observe<T>;
  unobserve: () => void;
}

interface Return<T> extends Omit<Event<T>, 'entry'> {
  entry?: ResizeObserverEntry;
}

export const useDimensions = <T extends HTMLDivElement | null>(): Return<T> => {
  const [state, setState] = useState({
    width: 0,
    height: 0,
  });
  const prevSizeRef = useRef<{ width?: number; height?: number }>({});
  const ref = useRef<T>();
  const observerRef = useRef<ResizeObserver>();

  const unobserve = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
  }, []);

  const observe = useCallback<Observe<T>>(
    (element) => {
      if (element && element !== ref.current) {
        unobserve();
        ref.current = element;
      }
      if (observerRef.current && ref.current)
        observerRef.current.observe(ref.current as HTMLDivElement);
    },
    [unobserve]
  );

  useEffect(() => {
    if (!('ResizeObserver' in window) || !('ResizeObserverEntry' in window)) {
      return () => null;
    }

    let raf: number | null = null;

    observerRef.current = new ResizeObserver(([entry]: any) => {
      raf = requestAnimationFrame(() => {
        const { contentRect } = entry;

        const { width, height } = contentRect;

        if (width === prevSizeRef.current.width && height === prevSizeRef.current.height) return;

        prevSizeRef.current = { width, height };

        const next = {
          width,
          height,
        };

        setState(next);
      });
    });

    observe();

    return () => {
      unobserve();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [observe, unobserve]);

  return { ...state, observe, unobserve };
};
