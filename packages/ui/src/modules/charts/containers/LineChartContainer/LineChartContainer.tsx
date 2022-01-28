/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useStore } from '@core/store/store';
import { Period, Point } from '@types';
import * as d3 from 'd3';
import { useDimensions } from 'hooks/useDimensions';
import React, { useEffect, useRef, useState } from 'react';

import ControlBar from '../../components/ControlBar/ControlBar';
import HorizontalAxis from '../../components/HorizontalAxis/HorizontalAxis';
import { LineChart } from '../../components/LineChart/LineChart';
import s from './LineChartContainer.module.scss';

type Props = {
  accountId: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LineChartContainer ({ accountId }: Props): React.ReactElement {
  const { height, observe, width } = useDimensions<HTMLDivElement>();
  const assets = useStore((state) => state.assets);

  const [tooltipPosition, setTooltipPosition] = useState<Point>({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState({
    date: '',
    value: 0
  });
  const [amount, setAmount] = useState(0);
  const currentAmount = useRef(0);

  // !¬ Data
  const [data, setData] = useState<d3.InternMap<Date, number[]>>(new Map());
  // const [pathMap, addPathToMap] = useState(new Map());

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/require-await
    async function setChartData (): Promise<void> {
      setData(assets.get(accountId)!);
    }

    if (assets.has(accountId)) {
      // todo: !!this should run only when new data appears AAAAAAAAAAAAA
      setChartData()
        .then(() => {
          const [firstElement] = assets.get(accountId)!.values().next().value;

          currentAmount.current = firstElement;
          setAmount(firstElement);
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err));
    }
  }, [assets, accountId, data]);

  // !¬ Accesors
  const x = ([x]: [Date, number[]]): Date => x;
  const y = ([, y]: [Date, number[]]): number => y[0];

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
    .defined(([i, _]) => D[i])
    .x(([i]) => xScale(X[i]!))
    .y(([i]) => yScale(Y[i]))
    .curve(d3.curveBasis);

  const path = lineGenerator(d3.map(data, (_, i) => [i, i]));

  // !¬ Mouse Events
  const onMouseEnter = (): void => {
    d3.select('#tooltip').style('opacity', 1);
    d3.select('#circle').style('opacity', 1);
  };

  const onMouseMove = (event: React.SyntheticEvent): void => {
    if (X.length && Y.length) {
      const hoveredPoint = xScale.invert(d3.pointer(event)[0]);
      const closestIndex = d3.leastIndex(
        data,
        (a, b) =>
          Math.abs((x(a) as any) - (hoveredPoint as any)) -
          Math.abs((x(b) as any) - (hoveredPoint as any))
      );

      const formatDate = d3.timeFormat('%d/%m/%Y');
      const xValue = X[closestIndex!];
      const yValue = Y[closestIndex!];
      const hoveredDate = formatDate(xValue);

      const xPos: number = xScale(xValue);
      const yPos: number = yScale(yValue);

      setTooltipPosition({ x: xPos - 75, y: yPos - 80 });
      d3.select('#circle').attr('cx', xPos).attr('cy', yPos);

      setTooltipData({ date: hoveredDate, value: yValue });
      setAmount(yValue);
    }
  };

  const onMouseLeave = (): void => {
    d3.select('#tooltip').style('opacity', 0);
    d3.select('#circle').style('opacity', 0);

    setAmount(currentAmount.current ?? 0);
  };

  return (
    <div className={s.chartContainer}>
      <ControlBar
        assetAmount={amount}
        currencySymbol='£'
      />
      <LineChart
        data={data}
        drawnPath={path!}
        height={height}
        id={accountId}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        ref={observe}
        tooltipData={tooltipData}
        tooltipPosition={tooltipPosition}
        width={width}
      />
      <HorizontalAxis period={Period.all} />
    </div>
  );
}

export default LineChartContainer;
