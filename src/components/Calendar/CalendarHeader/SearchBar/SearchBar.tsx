import { ReactComponent as SearchIcon } from './search.svg';
import { ReactComponent as CloseIcon } from './cross.svg';
import styles from './search-bar.module.scss';

const SearchBar = () => {
  return (
    <form className={styles.box}>
      <label className={styles.label}>
        <SearchIcon className={styles.icon} />
        <input className={styles.input} type="text" placeholder="Placeholder"></input>
        <CloseIcon className={styles.close} />
      </label>
    </form>
  );
};

export default SearchBar;
