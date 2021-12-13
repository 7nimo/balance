import { Card } from 'common/components/Card/Card';
import { ReactNode } from 'react';
import s from './Section.module.scss';

interface SectionProps {
  title?: string;
  children: ReactNode;
}

export const Section: React.FC<SectionProps & Record<string, any>> = ({
  title,
  children,
  ...restProps
}) => {
  return (
    <div className={s.container}>
      <Card {...restProps}>
        {title ? <h1 style={{ padding: '16px 32px' }}>{title}</h1> : null}
        {children}
      </Card>
    </div>
  );
};
