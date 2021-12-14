import { useDimensions } from 'hooks/useDimensions';
import { FC } from 'react';

export const Chart: FC = () => {
  const { observe, width, height } = useDimensions<HTMLDivElement>();

  return (
    <div ref={observe}>
      <p>Chart</p>
      <h2>
        {Math.floor(width)} x {Math.floor(height)}
      </h2>
      <h2>
        {Math.floor(width)} x {Math.floor(height)}
      </h2>
    </div>
  );
};
