import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Input (props: Partial<UseFormRegisterReturn> & { label: string }) {
  const { label, name, onBlur, onChange, ref } = props;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder='Jane'
        ref={ref}
      />
    </div>
  );
}
