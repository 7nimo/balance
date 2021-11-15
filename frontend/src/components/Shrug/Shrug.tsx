import { FC, useState } from 'react';

type Props = {
  label: string;
};

export const Shrug: FC<Props> = (props) => {
  const { label } = props;
  const [size, setSize] = useState(16);

  return (
    <div>
      <button
        type="button"
        style={{ border: 'none', background: 'transparent' }}
        onClick={() => setSize(1.1 * size + 1)}
      >
        <span style={{ fontSize: `${size}px` }}>{label}</span>
      </button>
    </div>
  );
};
