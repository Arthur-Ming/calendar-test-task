import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as CloseIcon } from './cross.svg';
import styles from './search-bar.module.scss';
import SearchBarList from './SearchBarList';
import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { selectedEventSelector } from '../../../../redux/selectors/search';
import { RootState } from '../../../../redux/reducer';
import { IEvent } from '../../../../interfaces';
import { selectSearchValue } from '../../../../redux/actions/search';

interface StateProps {
  selectedSearchValue: IEvent | null;
}

interface DispatchProps {
  selectSearchValue: (value: string | null) => void;
}

type Props = StateProps & DispatchProps;

const SearchBar = ({ selectedSearchValue, selectSearchValue }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [isListOpen, setListOpen] = useState(false);

  useEffect(() => {
    setSearchValue(selectedSearchValue?.title ?? '');
    setListOpen(false);
  }, [selectedSearchValue]);

  const searchBarWrapperRef: RefObject<HTMLFormElement> = useRef(null);

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setListOpen(true);
  };

  const onSelectedItemClick = () => {
    setSearchValue(selectedSearchValue?.title ?? '');
    setListOpen(false);
  };

  const onResetClick = () => {
    setSearchValue('');
    selectSearchValue(null);
  };

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        target &&
        searchBarWrapperRef.current &&
        !searchBarWrapperRef.current.contains(target as HTMLInputElement)
      ) {
        setListOpen(false);
      }
    };
    document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, []);

  return (
    <form className={styles.box} ref={searchBarWrapperRef}>
      <label className={styles.label}>
        <SearchIcon className={styles.icon} />
        <input
          className={styles.input}
          value={searchValue}
          onInput={onInput}
          type="text"
          placeholder="Placeholder"
          autoFocus
        />
        {searchValue && (
          <span onClick={onResetClick} className={styles.close_box}>
            <CloseIcon className={styles.close} />
          </span>
        )}
      </label>
      {isListOpen && searchValue && (
        <SearchBarList onSelectedItemClick={onSelectedItemClick} searchValue={searchValue} />
      )}
    </form>
  );
};

const mapStateToProps = (state: RootState) => ({
  selectedSearchValue: selectedEventSelector(state),
});

const mapDispatchToProps = {
  selectSearchValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
