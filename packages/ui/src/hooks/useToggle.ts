import { useState } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [state, setState] = useState(initialValue);
  const toggle = (): void => setState(!state);

  return [state, toggle];
};
