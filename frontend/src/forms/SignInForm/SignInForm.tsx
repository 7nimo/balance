import cx from 'classnames';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../components/Form/Button/Button';
import { useAuth } from '../../lib/auth';
import { LoginCredentials } from '../../models';
import s from './SignInForm.module.scss';

interface SignInInputs {
  email: string;
  password: string;
}

export function SignInForm(): JSX.Element {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, dirtyFields, isDirty, isValid },
    clearErrors,
  } = useForm<SignInInputs>({
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginCredentials> = async (values: SignInInputs) => {
    try {
      await login(values);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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
                htmlFor="email"
                className={cx(s.floatingLabel, {
                  [s.fieldDirty]: dirtyFields.email,
                  [s.fieldError]: errors.email,
                })}
              >
                Email
              </label>
              <input
                autoComplete="email"
                id="email"
                className={cx(s.fieldInput, { [s.fieldError]: errors.email })}
                type="email"
                onFocus={() => clearErrors('email')}
                {...register('email', {
                  required: 'Email is required',
                })}
              />
            </div>
          </div>

          <div className={s.fieldContainer}>
            <div className={s.fieldItem}>
              <label
                htmlFor="password"
                className={cx(s.floatingLabel, {
                  [s.fieldDirty]: dirtyFields.password,
                  [s.fieldError]: errors.password,
                })}
              >
                Password
              </label>
              <input
                autoComplete="current-password"
                id="password"
                className={cx(s.fieldInput, { [s.fieldError]: errors.password })}
                type="password"
                onFocus={() => clearErrors('password')}
                {...register('password', {
                  required: 'Password is required',
                })}
              />
            </div>
          </div>

          <div className={s.buttons}>
            <Button type="submit" primary disabled={!isDirty || !isValid}>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
