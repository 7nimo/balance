import { AnimateHeight } from 'common/components/AnimateHeight/AnimateHeight';
import { ChevronDown, ChevronUp } from 'common/components/icons';
import SvgCash from 'common/components/icons/Cash';
import { NavButton } from 'common/components/NavButton/NavButton';
import { FC, useEffect, useRef, useState } from 'react';
import s from './NavButtonExpandable.module.scss';

interface Props {
  link: string;
  label: string;
  icon: JSX.Element;
  data: any[];
}

export const NavButtonExpandable: FC<Props> = ({ link, label, icon, data }) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const measuredRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeight(measuredRef.current!.getBoundingClientRect().height);
  }, [measuredRef]);

  const handleClick = (): void => {
    setExpanded(!expanded);
    if (expanded) {
      setHeight(0);
    } else {
      setHeight(measuredRef.current!.getBoundingClientRect().height);
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
        <div className={s.expandableContent} ref={measuredRef}>
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
