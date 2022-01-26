import { FC } from 'react';

export const EmptyResult: FC = () => {
  return (
    <div style={{ width: '100%', height: '768px' }} className="center">
      <p>Hmmm, can&apos;t find anything!</p>
    </div>
  );
};
