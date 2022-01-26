// import cx from 'classnames';
import cx from 'classnames';
import s from './Card.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function Card({ children, className, style }: Props): React.ReactElement {
  return (
    <div style={style} className={cx(s.card, className)}>
      {children}
    </div>
  );
}

export default Card;
