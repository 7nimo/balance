import { AnimateHeight } from 'components/AnimateHeight/AnimateHeight';
import { ChevronDown, ChevronUp } from 'components/icons';
import SvgCash from 'components/icons/Cash';
import { NavButton } from 'components/NavButton/NavButton';
import { FC, useEffect, useRef, useState } from 'react';
import s from './NavButtonExpandable.module.scss';

interface Props {
  link: string;
  label: string;
  icon: JSX.Element;
  data: any[];
}

export const NavButtonExpandable: FC<Props> = ({ link, label, icon, data }) => {
  const initialValue = 0;
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState<number>(1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (height === 1 && ref.current) {
      if (ref.current.offsetHeight > 0) {
        setHeight(ref.current.offsetHeight);
        // ??
        setExpanded(true);
      }
    }
  }, [ref, height]);

  const handleClick = (): void => {
    setExpanded(!expanded);
    if (expanded) {
      setHeight(initialValue);
    } else {
      setHeight(ref.current!.offsetHeight);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.item}>
        <button type="button" className={s.focusable} onClick={handleClick}>
          <div className={s.iconWrapper}>{icon}</div>
          <span className={s.label}>{label}</span>
          <div className={s.trailingIcon}>{expanded ? <ChevronUp /> : <ChevronDown />}</div>
        </button>
      </div>

      <AnimateHeight className={s.expandableContainer} height={height}>
        <div className={s.expandableContent} ref={ref}>
          {data.map((item) => (
            <div className={s.listItem} key={item.id}>
              <NavButton link={`${link}/${item.id}`} label={item.name} icon={<SvgCash />} />
            </div>
          ))}
        </div>
      </AnimateHeight>
    </div>
  );
};
