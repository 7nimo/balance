import { FC, useRef } from 'react';
import SvgSearch from 'common/components/icons/Search';
import SvgCross from 'common/components/icons/actions/Cross';
import s from './SearchBar.module.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  value: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SearchBar: FC<Props> = ({ placeholder, value, handleChange, handleReset }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={s.searchBar} aria-hidden="true" onClick={() => inputRef.current?.focus()}>
      <SvgSearch className={s.icon} />
      <input
        className={s.field}
        type="search"
        placeholder={placeholder}
        value={value}
        ref={inputRef}
        onChange={handleChange}
      />
      <div className={s.iconWrapper}>
        {/* {showSpinner ? <div id="spinner" /> : null} */}
        {value ? (
          <button className={s.reset} type="button" onClick={handleReset}>
            <SvgCross />
          </button>
        ) : null}
      </div>
    </div>
  );
};
