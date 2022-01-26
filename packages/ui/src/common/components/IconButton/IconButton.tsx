import { FC } from 'react';
import s from './IconButton.module.scss';

type Props = React.HTMLProps<HTMLButtonElement> & {
  icon: JSX.Element;
};

export const IconButton: FC<Props> = ({ icon, onClick }) => {
  return (
    <button className={s.iconButton} type="button" onClick={onClick}>
      {icon}
    </button>
  );
};
