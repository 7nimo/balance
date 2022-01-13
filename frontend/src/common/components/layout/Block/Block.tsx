import { Card } from 'common/components/Card/Card';
import { ReactNode } from 'react';
import s from './Block.module.scss';

interface SectionProps {
  title?: string;
  children: ReactNode;
}

function Block({
  title,
  children,
  ...restProps
}: SectionProps & Record<string, any>): React.ReactElement {
  return (
    <div className={s.container}>
      <Card {...restProps}>
        {title ? <h3 className={s.title}>{title}</h3> : null}
        {children}
      </Card>
    </div>
  );
}

export default Block;
