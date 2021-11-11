// import cx from 'classnames';
import s from './Card.module.scss';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Card(CardProps: CardProps): JSX.Element {
  const { style, children } = CardProps;
  return (
    <div style={style} className={s.card}>
      {children}
    </div>
  );
}
