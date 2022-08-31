import styles from './calendar-header-buttons.module.scss';

const CalendarHeaderButtons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.button}>Добавить</button>
      <button className={styles.button}>Обновить</button>
    </div>
  );
};

export default CalendarHeaderButtons;
