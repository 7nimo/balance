import { FC } from 'react';
import { ControlBar } from 'modules/charts/components/ControlBar/ControlBar';
import { LineChart } from 'modules/charts/components/LineChart/LineChart';
import { HorizontalAxis } from 'modules/charts/components/HorizontalAxis/HorizontalAxis';
import { DataPoint, Period } from '@types';
import { useStore } from 'store/store';
import s from './ChartContainer.module.scss';

type Props = {
  assetData?: DataPoint[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ChartContainer: FC<Props> = ({ assetData }) => {
  const data = useStore((state) => state.d3);

  return (
    <div className={s.chartContainer}>
      <ControlBar currencySymbol="£" assetAmount={1000.89} />
      <LineChart assetData={data} />
      <HorizontalAxis period={Period.all} />
    </div>
  );
};
