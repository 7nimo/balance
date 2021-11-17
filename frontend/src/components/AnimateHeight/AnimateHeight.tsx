import { FC, ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLElement> {
  height: number;
  children: ReactNode;
}

export const AnimateHeight: FC<Props> = ({ height = 0, className, children }) => {
  const style = {
    height: `${height}px`,
  };

  return (
    <div style={{ ...style }} className={className}>
      {children}
    </div>
  );
};
