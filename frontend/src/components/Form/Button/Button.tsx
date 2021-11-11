import cx from 'classnames';
import s from './Button.module.scss';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  primary?: boolean;
  secondary?: boolean;
}

export function Button(props: ButtonProps): JSX.Element {
  const { primary, secondary, disabled, ...restProps } = props;

  return (
    <button
      type="button"
      className={cx(s.button, {
        [s.primary]: primary,
        [s.secondary]: secondary,
        [s.disabled]: disabled,
      })}
      {...restProps}
    />
  );
}

Button.defaultProps = {
  primary: true,
  secondary: false,
};
