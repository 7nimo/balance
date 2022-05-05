import { Point } from '@types';
import * as d3 from 'd3';
import { InternMap } from 'd3';
import React, { forwardRef, SyntheticEvent, useEffect, useRef } from 'react';

import s from './Chart.module.scss';

type Props = {
  id: string;
  data: InternMap<Date, number[]>;
  width: number;
  height: number;
  drawnPath: string;
  onMouseEnter: () => void;
  onMouseMove: (e: SyntheticEvent) => void;
  onMouseLeave: () => void;
  tooltipPosition: Point;
  tooltipData: { date: string; value: number };
};

// eslint-disable-next-line react/display-name
export const Chart = forwardRef<HTMLDivElement, Props>(
  (
    { data,
      drawnPath,
      height,
      id,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      tooltipData,
      tooltipPosition,
      width },
    ref
  ) => {
    const viewBox = `0 0 ${Math.floor(width)} ${Math.floor(height)}`;
    const shouldUpdate = useRef(true);
    const d3Container = useRef<SVGSVGElement>(null);

    // !!¬ Render
    useEffect(() => {
      if (data.size > 1 && d3Container.current && shouldUpdate.current === true) {
        const svg = d3.select(d3Container.current);

        shouldUpdate.current = false;

        // !¬ Path generator
        svg
          .append('g')
          .append('path')
          .attr('id', id)
          .attr('fill', 'none')
          .attr('stroke', 'var(--orange)')
          .attr('stroke-width', 2)
          .attr('d', drawnPath);

        svg.selectChild();

        // !¬ Tooltip circle
        svg
          .append('circle')
          .attr('id', 'circle')
          .attr('r', 4)
          .attr('stroke', 'white')
          .attr('fill', '#orange')
          .attr('stroke-width', 2)
          .style('opacity', 0);

        // const xAxisLine = svg
        //   .append('g')
        //   .append('rect')
        //   .attr('class', 'dotted')
        //   .attr('stroke-width', '1px')
        //   .attr('width', '.5px')
        //   .attr('height', height);

        // // !¬ X Axis
        // const xAxisGenerator = d3.axisBottom(xScale);
        // const xAxis = svg.append('g').call(xAxisGenerator);

        // // !¬ Y Axis
        // const yAxisGenerator = d3.axisLeft(yScale);
        // const yAxis = svg.append('g').call(yAxisGenerator);
      }
    }, [data, drawnPath, id]);

    return (
      <div
        className={s.chartWrapper}
        ref={ref}
      >
        <div
          className={s.tooltip}
          id='tooltip'
          style={{ left: tooltipPosition.x ?? 0, top: tooltipPosition.y ?? 0 }}
        >
          <div className={s.tooltipValue}>
            <span className={s.value}>{`£${tooltipData.value}`}</span>
            <span className={s.date}>{tooltipData.date}</span>
          </div>
        </div>

        <svg
          onMouseEnter={d3Container.current ? onMouseEnter : undefined}
          onMouseLeave={d3Container.current ? onMouseLeave : undefined}
          onMouseMove={d3Container.current ? onMouseMove : undefined}
          ref={d3Container}
          style={{ overflow: 'visible' }}
          viewBox={viewBox}
        />
      </div>
    );
  }
);
