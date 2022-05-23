import { LoginCredentials, RegisterCredentials, Status, UserEntity } from '@types';

import { get, post } from '../utils/http.util';
import { API_URL } from './constants';

export async function getUserData (): Promise<UserEntity> {
  return await get<UserEntity>(`${API_URL}/user/`);
}

export async function signIn (data: LoginCredentials): Promise<UserEntity> {
  return await post<UserEntity>(`${API_URL}/auth/sign-in/`, data);
}

export async function getNewRefreshToken (): Promise<Status> {
  return await post<Status>(`${API_URL}/auth/refresh/`);
}

export async function signUp (
  data: RegisterCredentials
): Promise<UserEntity> {
  return await post<UserEntity>(`${API_URL}/user/`, data);
}

export async function signOut (): Promise<Status> {
  return await post<Status>(`${API_URL}/auth/sign-out/`);
}
