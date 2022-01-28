import { queryClient } from '@core/lib/react-query';
import { Currency, User } from '@types';
import { StateCreator } from 'zustand';

const findCurrency = (): Currency | undefined => {
  const user = queryClient.getQueryData<User>('auth-user');
  const currencies = queryClient.getQueryData<Currency[]>('currency');

  return currencies?.find((currency: Currency) => currency.code === user?.baseCurrency.toUpperCase());
};

export interface UserSlice {
  baseCurrency?: Currency;
  setBaseCurrency: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  baseCurrency: undefined,
  setBaseCurrency: () => {
    set((state) => ({
      ...state,
      baseCurrency: findCurrency()
    }));
  }
});
