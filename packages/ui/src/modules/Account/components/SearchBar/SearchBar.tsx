import React, { FC, useRef } from 'react';

import SvgCross from '../../../../components/icons/actions/Cross';
import SvgSearch from '../../../../components/icons/Search';
import s from './SearchBar.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  value: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SearchBar: FC<Props> = ({ handleChange, handleReset, placeholder, value }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      aria-hidden='true'
      className={s.searchBar}
      onClick={() => inputRef.current?.focus()}
    >
      <SvgSearch className={s.icon} />
      <input
        className={s.field}
        onChange={handleChange}
        placeholder={placeholder}
        ref={inputRef}
        type='search'
        value={value}
      />
      <div className={s.iconWrapper}>
        {/* {showSpinner ? <div id="spinner" /> : null} */}
        {value
          ? (
            <button
              className={s.reset}
              onClick={handleReset}
              type='button'
            >
              <SvgCross />
            </button>
          )
          : null}
      </div>
    </div>
  );
};
