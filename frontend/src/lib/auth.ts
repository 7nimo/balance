import { initReactQueryAuth } from 'react-query-auth';
import { getUserData, registerWithEmailAndPassword, loginWithEmailAndPassword } from '../api/auth';

import { API_URL } from '../config/constants';
import { LoginCredentials, RegisterCredentials, User, Status, Error } from '../models';
import { handleApiResponse, post } from '../utils/http.util';

const waitInitial = false;

const loadUser = async (): Promise<User | null> => {
  let user = null;

  if (!user) {
    user = await getUserData();
  }

  return user;
};

const loginFn = async (loginCredentials: LoginCredentials): Promise<User> => {
  const user = await loginWithEmailAndPassword(loginCredentials);

  return user;
};

const registerFn = async (registerCredentials: RegisterCredentials): Promise<User> => {
  const user = await registerWithEmailAndPassword(registerCredentials);

  return user;
};

const logoutFn = async (): Promise<Status> => {
  const status = await post<Status>(`${API_URL}/auth/sign-out`).then(handleApiResponse);

  return status;
};

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  waitInitial,
};

const { AuthProvider, AuthConsumer, useAuth } = initReactQueryAuth<
  User | null,
  Error,
  LoginCredentials,
  RegisterCredentials
>(authConfig);

export { AuthProvider, AuthConsumer, useAuth };
