/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDimensions } from 'hooks/useDimensions';
import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { DataPoint } from '@types';
import s from './LineChart.module.scss';

type Props = {
  assetData: DataPoint[];
};

export const LineChart: FC<Props> = ({ assetData }) => {
  const { observe, width, height } = useDimensions<HTMLDivElement>();
  const viewBox = `0 0 ${Math.floor(width)} ${Math.floor(height)}`;
  const d3Container = useRef(null);

  useEffect(() => {
    if (assetData.length && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // !¬ Data

      const data: d3.InternMap<string, DataPoint[]> = d3.group(assetData, (d: DataPoint) => d.date);

      // !¬ Accesors
      const dateParser = d3.timeParse('%Y-%m-%d');

      const x = ([x]: [string, DataPoint[]]): Date => dateParser(x)!; // assume date always present
      const y = ([, y]: [string, DataPoint[]]): number => y[0].value;

      // Compute values.
      const X = d3.map(data, x);
      const Y = d3.map(data, y);
      const O = d3.map(data, (d) => d);
      const I = d3.map(data, (_, i) => i);

      // Compute which data points are considered defined.
      const defined = (d: unknown, i: number): boolean =>
        X[i] instanceof Date && !Number.isNaN(Y[i]);
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
        // .curve(d3.curveBasis)
        .x(([i]) => xScale(X[i]!))
        .y(([i]) => yScale(Y[i]));

      // !¬ Path generator
      svg
        .append('g')
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'var(--green-light)')
        .attr('stroke-width', 2)
        .attr('d', lineGenerator(d3.map(data, (_, i) => [i, i])));

      // !¬ X Axis
      const xAxisGenerator = d3.axisBottom(xScale);
      const xAxis = svg.append('g').call(xAxisGenerator);

      // !¬ Y Axis
      const yAxisGenerator = d3.axisLeft(yScale);
      const yAxis = svg.append('g').call(yAxisGenerator);

      // !¬ Tooltip
      const tooltip = svg
        .append('g')
        .append('rect')
        .attr('fill', 'transparent')
        .style('pointer-events', 'none')
        .attr('width', width)
        .attr('height', height);

      const onMouseMove = (event: any) => {
        console.log(event);
      };
      const onMouseLeave = (event: any) => {
        console.log(event);
      };

      tooltip.on('onMouseOver', onMouseMove);

      // const xAxisLine = svg
      //   .append('g')
      //   .append('rect')
      //   .attr('class', 'dotted')
      //   .attr('stroke-width', '1px')
      //   .attr('width', '.5px')
      //   .attr('height', height);

      // const getDistanceFromHoveredDate = (d) => Math.abs(Number(xAccessor(d)!) - hoveredDate);

      // const closestIndex = d3.scan(
      //   data,
      //   (a: any, b: any) => getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
      // );
    }
  }, [assetData, height, width]);

  return (
    <div className={s.chartWrapper} ref={observe}>
      <div id="tooltip" className="tooltip">
        <div className="tooltip-value">
          <span id="value" />
        </div>
        <div className="tooltip-date">
          <span id="date" />
        </div>
      </div>

      <svg style={{ overflow: 'visible' }} viewBox={viewBox} ref={d3Container}>
        {/* <rect width={Math.floor(width)} height={Math.floor(height)} fill="var(--card-bg)" /> */}
      </svg>
    </div>
  );
};
