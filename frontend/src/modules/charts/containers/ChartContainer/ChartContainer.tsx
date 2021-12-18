/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import { FC, ReactElement, ReactNode, useState } from 'react';
import { ControlBar } from 'modules/charts/components/ControlBar/ControlBar';
import { LineChart } from 'modules/charts/components/LineChart/LineChart';
import { HorizontalAxis } from 'modules/charts/components/HorizontalAxis/HorizontalAxis';
import { DataPoint, Period, Point } from '@types';
import { useStore } from 'store/store';
import * as d3 from 'd3';

import { useDimensions } from 'hooks/useDimensions';
import s from './ChartContainer.module.scss';

type Props = {
  assetData?: DataPoint[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ChartContainer: FC<Props> = ({ assetData }) => {
  const { observe, width, height } = useDimensions<HTMLDivElement>();
  const storeData = useStore((state) => state.d3);

  const [tooltipPosition, setTooltipPosition] = useState<Point>({ x: 0, y: 0 });
  const [date, setDate] = useState<string>();
  const [value, setValue] = useState<number>();

  // !¬ Data
  const data: d3.InternMap<Date, DataPoint[]> = d3.group(storeData, (d: DataPoint) => d.date);

  // !¬ Accesors
  const x = ([x]: [Date, DataPoint[]]): Date => x;
  const y = ([, y]: [Date, DataPoint[]]): number => y[0].value;

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

  // !¬ Line Generator
  const lineGenerator = d3
    .line()
    .defined(([i, _]) => D[i] as boolean)
    .x(([i]) => xScale(X[i]!))
    .y(([i]) => yScale(Y[i]));
  // .curve(d3.curveBasis)

  // !¬ Mouse Events
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
    <div className={s.chartContainer}>
      <ControlBar currencySymbol="£" assetAmount={1000.89} />
      <LineChart
        data={data}
        ref={observe}
        width={width}
        height={height}
        lineGenerator={lineGenerator}
        date={date}
        value={value}
        tooltipPosition={tooltipPosition}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      />
      <HorizontalAxis period={Period.all} />
    </div>
  );
};
