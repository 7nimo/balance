/* eslint-disable @typescript-eslint/explicit-function-return-type */
import create, { GetState, SetState, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, UserSlice } from './user-slice';
import { createAssetSlice, AssetSlice } from './asset-slice';

export interface Store extends AssetSlice, UserSlice {}

const store = (set: unknown, get: { (): UserSlice; (): AssetSlice }, api: unknown) => ({
  ...createUserSlice(
    set as unknown as SetState<UserSlice>,
    get as GetState<UserSlice>,
    api as unknown as StoreApi<UserSlice>
  ),
  ...createAssetSlice(
    set as unknown as SetState<AssetSlice>,
    get as GetState<AssetSlice>,
    api as unknown as StoreApi<AssetSlice>
  ),
});

export const useStore = create<Store>(devtools(store));
