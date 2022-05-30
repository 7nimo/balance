/* eslint-disable sort-keys */
import { UserEntity } from '@types';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getUserData, signIn, signOut, signUp } from './api/auth';

function useAuth () {
  const queryClient = useQueryClient();

  const { data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    refetch,
    status } = useQuery<UserEntity>('auth/user', getUserData);

  const setUser = React.useCallback(
    (user: UserEntity) => queryClient.setQueryData('auth/user', user),
    [queryClient]
  );

  const loginMutation = useMutation(
    signIn, {
    onSuccess: (user) => {
      setUser(user);
    }
  });

  const registerMutation = useMutation(
    signUp, {
    onSuccess: (user) => {
      setUser(user);
    }
  });

  const logoutMutation = useMutation(
    signOut, {
    onSuccess: () => {
      queryClient.clear();
    }
  });

   const state = React.useMemo(
      () => ({
        user,
        error,
        refetchUser: refetch,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isLoading,
        logout: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isLoading,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isLoading
      }),
      [
        user,
        error,
        refetch,
        loginMutation.mutateAsync,
        loginMutation.isLoading,
        logoutMutation.mutateAsync,
        logoutMutation.isLoading,
        registerMutation.mutateAsync,
        registerMutation.isLoading
      ]
    );

  return { ...state };
}

export { useAuth };
