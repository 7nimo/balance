
/* eslint-disable sort-keys */
import { createEntityAdapter, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { AccountEntity } from '@types';

export interface Account {
  id: string;
  value: Partial<AccountEntity>;
}

const accountEntity = createEntityAdapter<Account>();

export interface AccountsState {
  accounts: Account;
}

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: accountEntity.getInitialState()
  },
  reducers: {
    addAccount (state, { payload: { initialValue } }: PayloadAction<{ initialValue: Partial<AccountEntity> }>) {
      accountEntity.addOne(state.account, {
        value: initialValue,
        id: nanoid()
      });
    }
  }
});

export const accountActions = accountSlice.actions;

export type AccountSlice = {
  [accountSlice.name]: ReturnType<typeof accountSlice['reducer']>
}

export const accountSelectors = accountEntity.getSelectors<AccountSlice>(
  (state) => state[accountSlice.name].account
);
