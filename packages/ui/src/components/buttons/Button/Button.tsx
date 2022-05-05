import cx from 'classnames';
import React from 'react';

import s from './Button.module.scss';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  primary?: boolean;
  secondary?: boolean;
}

export function Button (props: ButtonProps): JSX.Element {
  const { disabled, primary, secondary, ...restProps } = props;

  return (
    <button
      className={cx(s.button, {
        [s.primary]: primary,
        [s.secondary]: secondary,
        [s.disabled]: disabled
      })}
      type='button'
      {...restProps}
    />
  );
}

Button.defaultProps = {
  primary: true,
  secondary: false
};
