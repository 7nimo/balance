/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable sort-keys */
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginCredentials, RegisterCredentials, registerSchema } from '@types';
import cx from 'classnames';
import ErrorMessage from 'components/status/ErrorMessage';
import { signIn, signUp } from 'core/api/auth';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-location';

import { FieldAlert } from '../styled';
import s from './SignUpForm.module.scss';

function SignUpForm (): React.ReactElement {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const { clearErrors,
    formState: { dirtyFields, errors, isDirty, isValid },
    handleSubmit,
    register } = useForm<RegisterCredentials>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: false,
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<RegisterCredentials> = async (formData: RegisterCredentials) => {
    await signUp(formData)
      .then(async () => await signIn({ email: formData.email, password: formData.password } as LoginCredentials))
      .then(() => navigate({ to: '../dashboard', replace: true }))
      .catch((err) => {
        console.error(err);

        if (err) {
          setShowError(true);
        }
      });
  };

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <main className={s.wrapper}>
      <div className={s.formContainer}>
        <h1 className={s.title}>Sign up to Balance</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          { showError
            ? <ErrorMessage
              onClose={handleClose}
              text={'An error occured.'}
              />
            : null
          }

          <div className={s.fieldContainer}>
            <div className={s.fieldItem}>
              <label
                className={cx(s.floatingLabel, {
                  [s.fieldDirty]: dirtyFields.username,
                  [s.fieldError]: errors.username
                })}
                htmlFor='username'
              >
                Username
              </label>
              <input
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect='off'
                className={cx(s.fieldInput, { [s.fieldError]: errors.username })}
                id='username'
                onFocus={() => clearErrors('username')}
                type='text'
                {...register('username', {
                  required: 'Username is required'
                })}
              />
                {errors.username && <FieldAlert>{errors.username.message}</FieldAlert>}
            </div>
          </div>

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
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect='off'
                className={cx(s.fieldInput, { [s.fieldError]: errors.email })}
                id='email'
                onFocus={() => clearErrors('email')}
                type='email'
                {...register('email', {
                  required: 'Email is required'
                })}
              />
                {errors.email && <FieldAlert>{errors.email.message}</FieldAlert>}
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
                autoCapitalize='none'
                autoComplete='off'
                autoCorrect='off'
                className={cx(s.fieldInput, { [s.fieldError]: errors.password })}
                id='password'
                onFocus={() => clearErrors('password')}
                type='password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: 8,
                  maxLength: 255
                })}
              />
                {errors.password && <FieldAlert>{errors.password.message}</FieldAlert>}
            </div>
          </div>

            <button
              className={s.btn}
              disabled={!isDirty || !isValid}
              type='submit'
            >
              &gt;
            </button>
        </form>
      </div>
    </main>
  );
}

export default SignUpForm;
