import { DarkMode, LightMode } from 'components/icons';
import { themeActions, ThemeState } from 'core/store/services/theme/slice';
import { useAppDispatch, useAppSelector } from 'core/store/store';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

function isChecked (theme: ThemeState): boolean {
  return theme.colorScheme === 'light';
}

const Input = styled.input`
  clip: rect(0 0 0 0);
  border: 0;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
  // cursor: pointer;
  
  &+svg {
    cursor: pointer;
  }
`;

export function ThemeToggler () {
  const theme = useAppSelector((state) => state.theme);
  const appDispatch = useAppDispatch();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    appDispatch(
      themeActions.changeColorScheme(
        theme.colorScheme === 'light' ? 'dark' : 'light'
      )
    );
  };

  return (
      <div className='theme-toggler'>
        <label htmlFor='theme-switch'>
          <Input
            checked={isChecked(theme)}
            id='theme-switch'
            name='theme-switch'
            onChange={handleChange}
            type='checkbox'
          />
          {theme.colorScheme === 'light' ? <DarkMode /> : <LightMode />}
        </label>
      </div>
  );
}
