/* eslint-disable sort-keys */
import { createEntityAdapter, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from '@types';

export interface User {
  value: Partial<UserEntity>;
  id: string
  intervalMs?: number
}

const userEntity = createEntityAdapter<User>();

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userEntity.getInitialState()
  },
  reducers: {
    addUser (
      state,
      { payload: { initialValue } }: PayloadAction<{ initialValue: Partial<UserEntity> }>
    ) {
      userEntity.addOne(state.user, {
        value: initialValue,
        id: nanoid()
      });
    },
    removeCounter (state, { payload }: PayloadAction<string>) {
      userEntity.removeOne(state.user, payload);
    },
    updateValue (state, action: PayloadAction<{ id: string; value: Partial<UserEntity> }>) {
      userEntity.upsertOne(state.user, action);
    },

    updateByPeriodically (
      state,
      { payload: { id, intervalMs } }: PayloadAction<{ id: string; delta: number; intervalMs: number }>
    ) {
      const previousValue = state.user.entities[id]?.value;
      const previousIntervalMs = state.user.entities[id]?.intervalMs;

      if (
        typeof previousValue === 'number' &&
        Number.isFinite(intervalMs) &&
        intervalMs > 0 &&
        !previousIntervalMs
      ) {
        userEntity.updateOne(state.user, {
          id,
          changes: { intervalMs }
        });
      }
    },
    updateByAsync (
      _,
      action: PayloadAction<{ id: string; delta: number; delayMs: number }>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ) {},
    cancelAsyncUpdates (state, { payload }: PayloadAction<string>) {
      delete state.user.entities[payload]?.intervalMs;
    }
  }
});

export const userActions = userSlice.actions;

export type UserSlice = {
  [userSlice.name]: ReturnType<typeof userSlice['reducer']>
}

export const userSelectors = userEntity.getSelectors<UserSlice>(
  (state) => state[userSlice.name].user
);
