import { Point } from '@types';
import * as d3 from 'd3';
import { useFirstRender } from 'hooks/useFirstRender';
import React, { forwardRef, SyntheticEvent, useEffect, useRef } from 'react';

import s from './Chart.module.scss';

type Props = {
  width: number;
  height: number;
  path: string;
  onMouseEnter?: () => void;
  onMouseMove?: (e: SyntheticEvent) => void;
  onMouseLeave?: () => void;
  tooltipPosition: Point;
  tooltipData: { date: string; value: number };
};

// eslint-disable-next-line react/display-name
export const Chart = forwardRef<HTMLDivElement, Props>(
  (
    { height,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      path,
      tooltipData,
      tooltipPosition,
      width },
    ref
  ) => {
    const viewBox = `0 0 ${Math.floor(width)} ${Math.floor(height)}`;
    const d3Container = useRef<SVGSVGElement>(null);
    const isFirstRender = useFirstRender();

    useEffect(() => {
      if (isFirstRender) {
        const svg = d3.select(d3Container.current);

        svg
        .append('g')
        .append('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'var(--orange)')
        .attr('stroke-width', 2);

        svg
        .append('circle')
        .attr('id', 'circle')
        .attr('r', 4)
        .attr('stroke', 'white')
        .attr('fill', '#orange')
        .attr('stroke-width', 2)
        .style('opacity', 0);
      }
    }, [isFirstRender]);

    // update path
    useEffect(() => {
      if (path) {
        const svg = d3.select(d3Container.current);

        svg.select('.line').attr('d', path);
      }
    }, [path]);

    return (
      <div
        className={s.chartWrapper}
        ref={ref}
      >
        <div
          className={s.tooltip}
          id='tooltip'
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
        >
          <div className={s.tooltipValue}>
            <span className={s.value}>{`${tooltipData.value}`}</span>
            <span className={s.date}>{tooltipData.date}</span>
          </div>
        </div>

        <svg
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          ref={d3Container}
          viewBox={viewBox}
        />
      </div>
    );
  }
);
