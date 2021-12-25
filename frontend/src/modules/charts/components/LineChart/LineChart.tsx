import { useEffect, useRef, SyntheticEvent, forwardRef } from 'react';
import * as d3 from 'd3';

import { DataPoint, Point } from '@types';
import { InternMap } from 'd3';
import s from './LineChart.module.scss';

type Props = {
  id: string;
  data: InternMap<Date, DataPoint[]>;
  width: number;
  height: number;
  drawnPath: string;
  onMouseEnter: () => void;
  onMouseMove: (e: SyntheticEvent) => void;
  onMouseLeave: () => void;
  date?: string;
  value?: number;
  tooltipPosition: Point;
};

export const LineChart = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      data,
      width,
      height,
      drawnPath,
      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      date,
      value,
      tooltipPosition,
    },
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
      <div className={s.chartWrapper} ref={ref}>
        <div
          id="tooltip"
          className={s.tooltip}
          style={{ left: tooltipPosition.x ?? 0, top: tooltipPosition.y ?? 0 }}
        >
          <div className={s.tooltipValue}>
            <span className={s.value}>{`£${value}`}</span>
            <span className={s.date}>{date}</span>
          </div>
        </div>

        <svg
          style={{ overflow: 'visible' }}
          viewBox={viewBox}
          ref={d3Container}
          onMouseEnter={d3Container.current ? onMouseEnter : undefined}
          onMouseMove={d3Container.current ? onMouseMove : undefined}
          onMouseLeave={d3Container.current ? onMouseLeave : undefined}
        />
      </div>
    );
  }
);
