/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDimensions } from 'hooks/useDimensions';
import { FC, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import { DataPoint } from '@types';
import s from './LineChart.module.scss';

type Props = {
  assetData: DataPoint[];
};

type Point = {
  x: number;
  y: number;
};

export const LineChart: FC<Props> = ({ assetData }) => {
  const { observe, width, height } = useDimensions<HTMLDivElement>();
  const viewBox = `0 0 ${Math.floor(width)} ${Math.floor(height)}`;
  const [tooltipPosition, setTooltipPosition] = useState<Point>({ x: 0, y: 0 });
  const [date, setDate] = useState<string>();
  const [value, setValue] = useState<number>();
  const shouldUpdate = useRef(true);
  const d3Container = useRef<SVGSVGElement>(null);

  // !¬ Data

  const data: d3.InternMap<string, DataPoint[]> = d3.group(assetData, (d: DataPoint) => d.date);

  // !¬ Accesors
  const dateParser = d3.timeParse('%Y-%m-%d');

  const x = ([x]: [string, DataPoint[]]): Date => dateParser(x)!;
  const y = ([, y]: [string, DataPoint[]]): number => y[0].value;

  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  // const O = d3.map(data, (d) => d);
  // const I = d3.map(data, (_, i) => i);

  // Compute which data points are considered defined.
  const defined = (d: unknown, i: number): boolean => X[i] instanceof Date && !Number.isNaN(Y[i]);
  const D = d3.map(data, defined);

  // !¬ Scales
  const xExtent = d3.extent(data, x) as [Date, Date];
  const xScale = d3.scaleTime().domain(xExtent).range([0, width]);

  const yExtent = d3.extent(data, y) as [number, number];
  const yScale = d3.scaleLinear().domain(yExtent).range([height, 0]);

  // !¬ Line generator
  const lineGenerator = d3
    .line()
    .defined(([i, _]) => D[i] as boolean)
    .x(([i]) => xScale(X[i]!))
    .y(([i]) => yScale(Y[i]));
  // .curve(d3.curveBasis)

  // !!¬ Render
  useEffect(() => {
    if (assetData.length && d3Container.current && shouldUpdate.current === true) {
      const svg = d3.select(d3Container.current);
      shouldUpdate.current = false;

      // !¬ Path generator
      svg
        .append('g')
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'var(--orange)')
        .attr('stroke-width', 2)
        .attr('d', lineGenerator(d3.map(data, (_, i) => [i, i])));

      // !¬ Tooltip

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
  }, [assetData, data, lineGenerator]);

  const onMouseEnter = (): void => {
    d3.select('#tooltip').style('opacity', 1);
    d3.select('#circle').style('opacity', 1);
  };

  const onMouseMove = (event: React.SyntheticEvent): void => {
    const hoveredDate = xScale.invert(d3.pointer(event)[0]);
    // const i = d3.bisectCenter(X, xScale.invert(d3.pointer(event)[0]));

    const closestIndex = d3.leastIndex(
      data,
      (a, b) =>
        Math.abs((x(a) as any) - (hoveredDate as any)) -
        Math.abs((x(b) as any) - (hoveredDate as any))
    );

    const formatDate = d3.timeFormat('%Y-%m-%d');

    const xValue = X[closestIndex!];
    const yValue = Y[closestIndex!];

    const date = formatDate(xValue);

    const xPos: number = xScale(xValue);
    const yPos: number = yScale(yValue);
    setTooltipPosition({ x: xPos - 75, y: yPos - 80 });
    d3.select('#circle').attr('cx', xPos).attr('cy', yPos);

    setDate(date);
    setValue(yValue);

    // data.get(date);
  };

  const onMouseLeave = (): void => {
    d3.select('#tooltip').style('opacity', 0);
    d3.select('#circle').style('opacity', 0);
  };

  return (
    <div className={s.chartWrapper} ref={observe}>
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
};
