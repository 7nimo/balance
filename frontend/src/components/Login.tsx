import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '../lib/auth';
import { LoginCredentials } from '../models';

export function Login(): JSX.Element {
  const { login } = useAuth();
  const { register, handleSubmit, setError /* formState */ } = useForm();

  const onSubmit: SubmitHandler<LoginCredentials> = async (values) => {
    try {
      await login(values);
    } catch (error) {
      setError('Login', { type: 'validate', message: 'Login failed' });
    }
  };

  // React.useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log('touchedFields', formState.touchedFields);
  // }, [formState]);

  return (
    <div>
      Login
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="email"
          {...register('email', {
            required: true,
          })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password', {
            required: true,
            minLength: 8,
          })}
        />

        <button type="submit">login</button>
      </form>
    </div>
  );
}
