import styles from './calendar-header.module.scss';
import CalendarHeaderControl from './CalendarHeaderControl';
import SearchBar from './SearchBar';

const CalendarHeader = () => (
  <header className={styles.header}>
    <div className={styles.box}>
      <CalendarHeaderControl />
      <SearchBar />
    </div>
  </header>
);

export default CalendarHeader;
