// import { Error, LoginCredentials, RegisterCredentials, Status, UserEntity } from '@types';
// import { getUserData, signIn, signUp } from 'core/api/auth';
// import { initReactQueryAuth } from 'react-query-auth';

// import { API_URL } from '../api/constants';
// import { post } from '../utils/http.util';

// const waitInitial = true;

// const loadUser = async (): Promise<UserEntity> => {
//   return getUserData();
// };

// const loginFn = async (loginCredentials: LoginCredentials): Promise<UserEntity> => {
//   return loginWithEmailAndPassword(loginCredentials);
// };

// const registerFn = async (registerCredentials: RegisterCredentials): Promise<UserEntity> => {
//   return registerWithEmailAndPassword(registerCredentials);
// };

// const logoutFn = async (): Promise<void> => {
//   await post<Status>(`${API_URL}/auth/sign-out`);
// };

// const authConfig = {
//   loadUser,
//   loginFn,
//   logoutFn,
//   registerFn,
//   waitInitial
// };

// const { AuthConsumer, AuthProvider, useAuth } = initReactQueryAuth<
// UserEntity,
// Error | string,
// LoginCredentials,
// RegisterCredentials
// >(authConfig);

// export { AuthProvider, AuthConsumer, useAuth };
