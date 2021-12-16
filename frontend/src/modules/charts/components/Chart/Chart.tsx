/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDimensions } from 'hooks/useDimensions';
import { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import s from './Chart.module.scss';

type Props = {
  data: any;
};

export const Chart: FC<Props> = ({ data }) => {
  const { observe, width, height } = useDimensions<HTMLDivElement>();
  const viewBox = `0 0 ${Math.floor(width)} ${Math.floor(height)}`;
  const d3Container = useRef(null);

  useEffect(() => {
    if (data.length && d3Container.current) {
      const svg = d3.select(d3Container.current);

      // !¬ Data

      // const dataByDate = d3.group(data, (d: any): any => d.date);

      // console.log(dataByDate);

      // !¬ Accesors // todo: type validation
      const dateParser = d3.timeParse('%Y-%m-%d');
      const xAccessor = (d: any) => dateParser(d.date);

      const yAccessor = (d: any) => Number(d.value);

      // !¬ Scales
      const xExtent = d3.extent(data, xAccessor) as [Date, Date];
      const xScale = d3.scaleTime().domain(xExtent).range([0, width]);

      const yExtent = d3.extent(data, yAccessor) as [number, number];
      const yScale = d3.scaleLinear().domain(yExtent).range([height, 0]);

      // !¬ Line generator
      const lineGenerator = d3
        .line()
        .x((d) => xScale(xAccessor(d)!))
        .y((d) => yScale(yAccessor(d)));
      // .curve(d3.curveBasis);

      // !¬ Path generator
      svg
        .append('g')
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'var(--green-light)')
        .attr('stroke-width', 2)
        .attr('d', lineGenerator(data));

      // !¬ Tooltip
      const onMouseMove = () => {};
      const onMouseLeave = () => {};

      const tooltip = svg
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'transparent')
        .on('mousemove', onMouseMove)
        .on('mouseleave', onMouseLeave);

      const xAxisLine = svg
        .append('g')
        .append('rect')
        .attr('class', 'dotted')
        .attr('stroke-width', '1px')
        .attr('width', '.5px')
        .attr('height', height);

      // const getDistanceFromHoveredDate = (d) => Math.abs(Number(xAccessor(d)!) - hoveredDate);

      // const closestIndex = d3.scan(
      //   data,
      //   (a: any, b: any) => getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
      // );
    }
  }, [data, height, width]);

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

      <svg viewBox={viewBox} ref={d3Container}>
        {/* <rect width={Math.floor(width)} height={Math.floor(height)} fill="var(--card-bg)" /> */}
      </svg>
    </div>
  );
};
