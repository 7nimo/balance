import React, { FC, ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  height: number;
  children: ReactNode;
}

export const AnimateHeight: FC<Props> = ({ children, className, height = 0 }) => {
  const style = {
    height: `${height}px`
  };

  return (
    <div
      className={className}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};
