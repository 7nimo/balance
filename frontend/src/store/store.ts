import create, { GetState, SetState, StoreApi } from 'zustand';
import { createUserSlice, UserSlice } from './user-slice';
import { createAssetSlice, AssetSlice } from './asset-slice';

export interface Store extends AssetSlice, UserSlice {}

export const useStore = create<Store>((set, get, api) => ({
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
}));
