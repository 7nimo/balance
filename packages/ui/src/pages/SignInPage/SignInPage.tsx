import SignInForm from 'components/forms/SignInForm/SignInForm';
import React from 'react';

import s from './SignInPage.module.scss';

export default function SignInPage (): JSX.Element {
  return (
    <div className={s.bg}>
      <div className={s.formContainer}>
        <SignInForm />
      </div>
    </div>
  );
}
