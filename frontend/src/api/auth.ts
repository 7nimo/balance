import { API_URL } from '../config/constants';
import { LoginCredentials, RegisterCredentials, Status, User } from '../models';
import { get, post } from '../utils/http.util';

export async function getUserData(): Promise<User | undefined> {
  const { data: user } = await get<User>(`${API_URL}/user/`);

  return user;
}

export async function loginWithEmailAndPassword(data: LoginCredentials): Promise<User | undefined> {
  const { data: user } = await post<User>(`${API_URL}/auth/sign-in/`, data);

  return user;
}

export async function getNewRefreshToken(): Promise<void> {
  await post<Status>(`${API_URL}/auth/refresh/`);
}

export async function registerWithEmailAndPassword(
  data: RegisterCredentials
): Promise<User | undefined> {
  const { data: user } = await post<User>(`${API_URL}/user/`, data);

  return user;
}

export async function logout(): Promise<Status | undefined> {
  const { data: status } = await post<Status>(`${API_URL}/auth/sign-out/`, null);

  return status;
}
