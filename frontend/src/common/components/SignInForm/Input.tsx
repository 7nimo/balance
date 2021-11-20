import { UseFormRegisterReturn } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Input = (props: Partial<UseFormRegisterReturn> & { label: string }) => {
  const { onChange, onBlur, ref, name, label } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        placeholder="Jane"
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  );
};
