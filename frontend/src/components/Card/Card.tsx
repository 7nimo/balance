// import cx from 'classnames';
import s from './Card.module.scss';

interface CardProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Card(CardProps: CardProps): JSX.Element {
  const { style, children } = CardProps;
  return (
    <div style={style} className={s.card}>
      {children}
    </div>
  );
}
