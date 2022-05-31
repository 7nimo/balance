import { Unsubscribe } from '@reduxjs/toolkit';

import type { AppStartListening } from '../../../store';
import { accountActions } from './slice';

function calculateChartData (
  action: ReturnType<typeof accountActions.mapTransactionsToD3Data>
) {
  console.log(action);
}

export function setupThemeListeners (
  startListening: AppStartListening
): Unsubscribe {
  const listeners = [
    startListening({
      actionCreator: accountActions.mapTransactionsToD3Data,
      effect: calculateChartData
    })
  ];

  return () => listeners.forEach((unsubscribe) => unsubscribe());
}
