import styles from './calendar-header.module.scss';
import CalendarHeaderButtons from './CalendarHeaderButtons';
import SearchBar from './SearchBar';

const CalendarHeader = () => (
  <header className={styles.header}>
    <div className={styles.box}>
      <CalendarHeaderButtons />
      <SearchBar />
    </div>
  </header>
);

export default CalendarHeader;
