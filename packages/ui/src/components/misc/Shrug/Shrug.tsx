import React, { FC, useState } from 'react';

type Props = {
  label: string;
};

export const Shrug: FC<Props> = (props) => {
  const { label } = props;
  const [size, setSize] = useState(16);

  return (
    <div>
      <button
        onClick={() => setSize(1.1 * size + 1)}
        style={{ background: 'transparent', border: 'none' }}
        type='button'
      >
        <span style={{ fontSize: `${size}px` }}>{label}</span>
      </button>
    </div>
  );
};
