/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Period, Point } from '@types';
import { useAppSelector } from 'core/store/store';
import { formatDate, x, y } from 'core/utils/d3.utils';
import * as d3 from 'd3';
import { useDimensions } from 'hooks/useDimensions';
import React, { useEffect, useRef, useState } from 'react';
import { useMatch } from 'react-location';
import { LocationGenerics } from 'routes';

import ControlBar from '../common/ControlBar/ControlBar';
import HorizontalAxis from '../common/HorizontalAxis/HorizontalAxis';
import { Chart } from './Chart/Chart';
import s from './LineChart.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function LineChart (): React.ReactElement {
  const { params: { accountId } } = useMatch<LocationGenerics>();
  const { height, observe, width } = useDimensions<HTMLDivElement>();

  const [tooltipPosition, setTooltipPosition] = useState<Point>({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState({
    date: '',
    value: 0
  });
  const [amount, setAmount] = useState(0);
  const currentAmount = useRef(0); // todo: simplify to account.balance

  // !¬ Data
  const [data, setData] = useState<d3.InternMap<Date, number[]>>(new Map());

  //! Account Data
  const account = useAppSelector((state) => state.accounts.find((acc) => acc.id === accountId));

  //! [X, Y] values
  const [X, setX] = useState<any>();
  const [Y, setY] = useState<any>();

  //! Path
  const [path, setPath] = useState<any>();

  // !¬ Scales
  const xExtent = d3.extent(data, x) as [Date, Date];
  const xScale = d3.scaleTime().domain(xExtent).range([0, width]);

  const yExtent = d3.extent(data, y) as [number, number];
  const yScale = d3.scaleLinear().domain(yExtent).range([height, 0]);

  const lineGenerator = d3.line()
    // .defined(([i, _]) => D[i])
    .x(([i]) => xScale(X[i]!))
    .y(([i]) => yScale(Y[i]));
    // .curve(d3.curveBasis);

  useEffect(() => {
    if (account) { setData(account.data); }
  }, [account]);

  useEffect(() => {
    if (data) {
      setX(d3.map(data, x));
      setY(d3.map(data, y));
    }
  }, [data]);

  useEffect(() => {
    if (data && lineGenerator) {
      setPath(lineGenerator(d3.map(data, (_, i) => [i, i])));
    }
  }, [data, lineGenerator]);

  // Compute values.

  // const O = d3.map(data, (d) => d);
  // const I = d3.map(data, (_, i) => i);

  // Compute which data points are considered defined.
  // const defined = (d: unknown, i: number): boolean => X[i] instanceof Date && !Number.isNaN(Y[i]);
  // const D = d3.map(data, defined);

  // !¬ Line Generator
  // const lineGenerator = d3
  //   .line()
  //   // .defined(([i, _]) => D[i])
  //   .x(([i]) => xScale(X[i]!))
  //   .y(([i]) => yScale(Y[i]))
  //   .curve(d3.curveBasis);

  // const path = lineGenerator(d3.map(data!, (_, i) => [i, i]));

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
      { data
        ? (
        <Chart
          data={data}
          height={height}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          path={path}
          ref={observe}
          tooltipData={tooltipData}
          tooltipPosition={tooltipPosition}
          width={width}
        />
      )
        : null}
      <HorizontalAxis period={Period.all} />
    </div>
  );
}

export default LineChart;
