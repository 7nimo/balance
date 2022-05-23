import { useToggle } from 'hooks/useToggle';
import React, { FC, ReactNode, RefObject, useEffect, useRef, useState } from 'react';

import { ChevronDown, ChevronUp } from '../../../icons';
import { AnimateHeight } from '../../../misc/AnimateHeight/AnimateHeight';
import s from './NavButtonExpandable.module.scss';

interface Props {
  label: string;
  icon: JSX.Element;
  children?: ReactNode | null;
}

// todo: render  regular button if no children
// todo: use hook to extract dimensions

export const NavButtonExpandable: FC<Props> = ({ children, icon, label }) => {
  const [expanded, toggleExpanded] = useToggle(false);
  const [height, setHeight] = useState(0);
  const measuredRef = useRef<HTMLDivElement>(null);

  const getContentHeight = (ref: RefObject<HTMLDivElement>): number => {
    return ref.current!.getBoundingClientRect().height;
  };

  useEffect(() => {
    setHeight(getContentHeight(measuredRef));
  }, [measuredRef]);

  const handleClick = (): void => {
    toggleExpanded();
    expanded ? setHeight(0) : setHeight(getContentHeight(measuredRef));
  };

  return (
    <div className={s.container}>
      <div className={s.item}>
        <button
          className={s.focusable}
          onClick={handleClick}
          type='button'
        >
          <div className={s.iconWrapper}>{icon}</div>
          <span className={s.label}>{label}</span>
          {children
            ? (
              <div className={s.trailingIcon}>{expanded ? <ChevronUp /> : <ChevronDown />}</div>
            )
            : null}
        </button>
      </div>

      <AnimateHeight
        className={s.expandableContainer}
        height={height}
      >
        <div
          className={s.expandableContent}
          ref={measuredRef}
        >
          {children}
        </div>
      </AnimateHeight>
    </div>
  );
};
