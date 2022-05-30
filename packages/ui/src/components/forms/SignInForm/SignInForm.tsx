/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable sort-keys */
import { ERROR, LoginCredentials } from '@types';
import cx from 'classnames';
import ErrorMessage from 'components/status/ErrorMessage';
import { signIn } from 'core/api/auth';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-location';

import { Button } from '../../buttons/Button/Button';
import s from './SignInForm.module.scss';

function SignInForm (): React.ReactElement {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const { clearErrors,
    formState: { dirtyFields, errors, isDirty, isValid },
    handleSubmit,
    register,
    resetField,
    setFocus } = useForm<LoginCredentials>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<LoginCredentials> = async (formData: LoginCredentials) => {
    await signIn(formData)
      .then(() => navigate({ to: '../dashboard', replace: true }))
      .catch((e) => {
        if (e === ERROR.Unauthorized && !showError) {
          setShowError(true);
          resetField('password');
          setFocus('password');
        }
      });
  };

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <div className={s.formWrapper}>
      <div className={s.formContainer}>
        <h1 className={s.title}>Sign in to Balance</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          { showError
            ? <ErrorMessage
              onClose={handleClose}
              text={'Incorrect email or password.'}
              />
            : null
          }
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
                // type='email'
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
              disabled={!isValid}
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
