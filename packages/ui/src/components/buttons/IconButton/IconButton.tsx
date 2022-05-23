import React, { FC } from 'react';

import s from './IconButton.module.scss';

type Props = React.HTMLProps<HTMLButtonElement> & {
  icon: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function IconButton ({ icon, onClick }: Props): React.ReactElement<Props> {
  return (
    <button
      className={s.iconButton}
      onClick={onClick}
      type='button'
    >
      {icon}
    </button>
  );
}
