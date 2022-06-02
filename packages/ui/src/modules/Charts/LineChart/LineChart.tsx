/* eslint-disable @typescript-eslint/no-explicit-any */
import { Period, Point } from '@types';
import { useAccount } from 'core/api/account';
import { useAppSelector } from 'core/store/store';
import { formatDate, x, y } from 'core/utils/d3.utils';
import * as d3 from 'd3';
import { useDimensions } from 'hooks/useDimensions';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useMatch } from 'react-location';
import { LocationGenerics } from 'routes';
import styled from 'styled-components';

import ControlBar from '../common/ControlBar/ControlBar';
import HorizontalAxis from '../common/HorizontalAxis/HorizontalAxis';
import { Chart } from './Chart/Chart';

function LineChart (): React.ReactElement {
  const { params: { accountId } } = useMatch<LocationGenerics>();
  const { data: account } = useAccount(accountId);
  const { height, observe, width } = useDimensions<HTMLDivElement>();

  const [tooltipPosition, setTooltipPosition] = useState<Point>({ x: 0, y: 0 });
  const [tooltipData, setTooltipData] = useState({
    date: '',
    value: 0
  });
  const [balance, setBalance] = useState(account?.balance);

  // !¬ Data
  const [data, setData] = useState<d3.InternMap<Date, number[]>>(new Map());

  //! Account Data
  const _account = useAppSelector((state) => state.accounts.find((acc) => acc.id === accountId));

  //! [X, Y] values
  const [X, setX] = useState<any>();
  const [Y, setY] = useState<any>();
  // const [D, setD] = useState<any>();

  //! Path
  const [path, setPath] = useState<string>();

  //! Scales
  const xExtent = useMemo(() => d3.extent(data, x) as [Date, Date], [data]);
  const yExtent = useMemo(() => d3.extent(data, y) as [number, number], [data]);
  const xScale = useMemo(() => d3.scaleTime().domain(xExtent).range([0, width]), [width, xExtent]);
  const yScale = useMemo(() => d3.scaleLinear().domain(yExtent).range([height - 8, 8]), [height, yExtent]);

  const lineGenerator = useMemo(
    () => d3.line()
      // .defined(([i, _]) => D[i])
      .x(([i]) => xScale(X[i]))
      .y(([i]) => yScale(Y[i]))
      .curve(d3.curveStepAfter)
      , [X, Y, xScale, yScale]
    );

  useEffect(() => {
    if (_account) { setData(_account.data); }
  }, [_account]);

  useEffect(() => {
    if (account) { setBalance(account.balance); }
  }, [account]);

  useEffect(() => {
    // Compute values.
    // const O = d3.map(data, (d) => d);

    if (data) {
      setX(d3.map(data, x));
      setY(d3.map(data, y));
    }
  }, [data]);

  // Compute which data points are considered defined.
  // useEffect(() => {
  //   const defined = (d: unknown, i: number): boolean => X[i] instanceof Date && !Number.isNaN(Y[i]);

  //   setD(d3.map(data, defined));
  // }, [data, X, Y]);

  useEffect(() => {
    if (data) {
      setPath(lineGenerator(d3.map(data, (_, i) => [i, i]))!);
    }
  }, [data, lineGenerator]);

  // !¬ Mouse Events
  const onMouseEnter = useCallback(
    () => {
      if (data.size > 0) {
        d3.select('#tooltip').style('opacity', 1);
        d3.select('#circle').style('opacity', 1);
      }
    },
    [data]
  );

  const onMouseMove = useCallback(
    (event: React.SyntheticEvent) => {
      if (data.size > 0) {
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

        const xPos = xScale(xValue);
        const yPos = yScale(yValue);

        d3.select('#circle').attr('cx', xPos).attr('cy', yPos);

        setTooltipPosition({ x: xPos, y: yPos });
        setTooltipData({ date: hoveredDate, value: yValue });
        setBalance(yValue);
      }
  }, [X, Y, data, xScale, yScale]);

  const onMouseLeave = useCallback(() => {
    if (data.size > 0) {
      d3.select('#tooltip').style('opacity', 0);
      d3.select('#circle').style('opacity', 0);
    }

    setBalance(account?.balance);
  }, [account?.balance, data]);

  return (
    <ChartWrapper>
      <ControlBar
        balance={balance ?? 0}
        currencySymbol={account?.currency.symbol}
      />
        <Chart
          height={height}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          path={path!}
          ref={observe}
          tooltipData={tooltipData}
          tooltipPosition={tooltipPosition}
          width={width}
        />
      <HorizontalAxis period={Period.all} />
    </ChartWrapper>
  );
}

export default LineChart;

const ChartWrapper = styled.div`
  width: 100%;
`;
