import React from 'react';
import SignInForm from 'src/common/components/forms/SignInForm/SignInForm';

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
