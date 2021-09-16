import { initReactQueryAuth } from 'react-query-auth';

import { API_URL } from '../config/constants';
import {
  LoginCredentials, RegisterCredentials, User, Status,
} from '../models';
import { post } from '../utils/http.util';

const loadUser = async (userId: string): Promise<User> => {
  // this should return user profile in the future
  const { data: user } = await post<User>(`${API_URL}/auth/sign-in`, userId);

  if (!user) {
    throw new Error('Error while getting user data');
  }
  return user;
};

const loginFn = async (loginCredentials: LoginCredentials): Promise<User> => {
  const { data: user } = await post<User>(
    `${API_URL}/auth/sign-in`,
    loginCredentials,
  );

  if (!user) {
    throw new Error('Login process failed');
  }
  return user;
};

const registerFn = async (registerCredentials: RegisterCredentials): Promise<User> => {
  const { data: user } = await post<User>(`${API_URL}/user`, registerCredentials);

  if (!user) {
    throw new Error('Registration process failed');
  }
  return user;
};

const logoutFn = async (): Promise<Status> => {
  const { data: status } = await post<Status>(`${API_URL}/auth/sign-out`, null);

  if (!status) {
    throw new Error('Logout process failed');
  }
  return status;
};

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
User,
Error,
LoginCredentials,
RegisterCredentials
>(authConfig);
