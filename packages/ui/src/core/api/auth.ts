import { LoginCredentials, RegisterCredentials, Status, UserEntity } from '@types';

import { get, post } from '../utils/http.util';
import { API_URL } from './constants';

export async function getUserData (): Promise<UserEntity | undefined> {
  const user = await get<UserEntity>(`${API_URL}/user/`);

  return user;
}

export async function loginWithEmailAndPassword (data: LoginCredentials): Promise<UserEntity | undefined> {
  const user = await post<UserEntity>(`${API_URL}/auth/sign-in/`, data);

  return user;
}

export async function getNewRefreshToken (): Promise<void> {
  await post<Status>(`${API_URL}/auth/refresh/`);
}

export async function registerWithEmailAndPassword (
  data: RegisterCredentials
): Promise<UserEntity | undefined> {
  const user = await post<UserEntity>(`${API_URL}/user/`, data);

  return user;
}

export async function logout (): Promise<Status | undefined> {
  const status = await post<Status>(`${API_URL}/auth/sign-out/`, null);

  return status;
}
