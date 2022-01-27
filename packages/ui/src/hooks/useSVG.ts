/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// source: https://stackoverflow.com/questions/61339259/how-to-dynamically-import-svg-and-render-it-inline

import { useEffect, useRef, useState } from 'react';

interface UseDynamicSVGImportOptions {
  onCompleted?: (
    name: string,
    SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined
  ) => void;
  onError?: (err: Error | unknown) => void;
}

function useSVG (name: string, options: UseDynamicSVGImportOptions = {}) {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>();

  const { onCompleted, onError } = options;

  useEffect(() => {
    setLoading(true);

    const importIcon = async (): Promise<void> => {
      try {
        ImportedIconRef.current = (await import(`./${name}.svg`)).ReactComponent;
        onCompleted?.(name, ImportedIconRef.current);
      } catch (err) {
        onError?.(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
}

export default useSVG;
