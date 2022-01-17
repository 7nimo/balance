import Card from 'common/components/layout/Card/Card';
import s from './Block.module.scss';

interface SectionProps {
  title?: string;
  children: React.ReactNode;
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
