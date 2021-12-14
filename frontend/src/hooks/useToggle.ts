import { useState } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [state, setValue] = useState(initialValue);
  const toggle = (): void => setValue(!state);
  return [state, toggle];
};
