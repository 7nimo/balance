/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue] as const;
};
