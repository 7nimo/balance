import { FC } from 'react';
import { ControlBar } from 'modules/charts/components/ControlBar/ControlBar';
import { Chart } from 'modules/charts/components/Chart/Chart';
import { HorizontalAxis } from 'modules/charts/components/HorizontalAxis/HorizontalAxis';
import { Period } from '@types';
import { useStore } from 'store/store';
import s from './ChartContainer.module.scss';

type Props = {
  assetData?: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ChartContainer: FC<Props> = ({ assetData }) => {
  const data = useStore((state) => state.d3);

  return (
    <div className={s.chartContainer}>
      <ControlBar currencySymbol="£" assetAmount={87689.89} />
      <Chart data={data} />
      <HorizontalAxis period={Period.all} />
    </div>
  );
};
