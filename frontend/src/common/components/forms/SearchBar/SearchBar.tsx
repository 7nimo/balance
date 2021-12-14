import { FC } from 'react';
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
  return (
    <div className={s.searchBar}>
      <SvgSearch className={s.icon} />
      <input
        className={s.field}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {value ? (
        <button className={s.reset} type="button" onClick={handleReset}>
          <SvgCross />
        </button>
      ) : null}
    </div>
  );
};
