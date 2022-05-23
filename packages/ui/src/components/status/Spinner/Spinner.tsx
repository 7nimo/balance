import React from 'react';

type Props = {
  size?: number;
};

function Spinner ({ size }: Props): React.ReactElement<Props> {
  return (
    <div
      id='spinner'
      style={{ fontSize: `${size}px` }}
    />
  );
}

export default Spinner;
