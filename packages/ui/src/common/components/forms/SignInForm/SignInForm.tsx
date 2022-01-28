/* eslint-disable sort-keys */
import { Button } from '@components/Button/Button';
import { useAuth } from '@core/lib/auth';
import { LoginCredentials } from '@types';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-location';

import s from './SignInForm.module.scss';

type SignInInputs = {
  email: string;
  password: string;
};

function SignInForm (): React.ReactElement {
  const { login } = useAuth();
  const navigate = useNavigate();

  const { clearErrors,
    formState: { dirtyFields, errors, isDirty, isValid },
    handleSubmit,
    register,
    setFocus } = useForm<SignInInputs>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<LoginCredentials> = async (formData: SignInInputs) => {
    await login(formData).then(() => navigate({ to: '../dashboard', replace: true }));
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  return (
    <div className={s.formWrapper}>
      <div className={s.formContainer}>
        <h1 className={s.title}>Sign in to Balance</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.fieldContainer}>
            <div className={s.fieldItem}>
              <label
                className={cx(s.floatingLabel, {
                  [s.fieldDirty]: dirtyFields.email,
                  [s.fieldError]: errors.email
                })}
                htmlFor='email'
              >
                Email
              </label>
              <input
                autoComplete='email'
                className={cx(s.fieldInput, { [s.fieldError]: errors.email })}
                id='email'
                onFocus={() => clearErrors('email')}
                type='email'
                {...register('email', {
                  required: 'Email is required'
                })}
              />
            </div>
          </div>

          <div className={s.fieldContainer}>
            <div className={s.fieldItem}>
              <label
                className={cx(s.floatingLabel, {
                  [s.fieldDirty]: dirtyFields.password,
                  [s.fieldError]: errors.password
                })}
                htmlFor='password'
              >
                Password
              </label>
              <input
                autoComplete='current-password'
                className={cx(s.fieldInput, { [s.fieldError]: errors.password })}
                id='password'
                onFocus={() => clearErrors('password')}
                type='password'
                {...register('password', {
                  required: 'Password is required'
                })}
              />
            </div>
          </div>

          <div className={s.buttons}>
            <Button
              disabled={!isDirty || !isValid}
              primary
              type='submit'
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
