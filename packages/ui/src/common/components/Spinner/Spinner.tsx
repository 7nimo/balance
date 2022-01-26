import { FC } from 'react';

type Props = {
  size?: number;
};

export const Spinner: FC<Props> = ({ size }) => {
  return <div id="spinner" style={{ fontSize: `${size}px` }} />;
};
