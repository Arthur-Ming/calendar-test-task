import { ReactComponent as ArrowPrevIcon } from './arrow-prev.svg';
import { ReactComponent as ArrowNextIcon } from './arrow-next.svg';
import styles from './calendar-control.module.scss';
import { connect } from 'react-redux';
import { calendarDateSelector, isCurrentDateSelector } from '../../../redux/selectors';
import { RootState } from '../../../redux/reducer';
import { getCurrentMonth, getNextMonth, getPrevMonth } from '../../../redux/actions/calendar';
import classNames from 'classnames';

interface StateProps {
  date: string | null;
  isCurrentDate: boolean;
}

interface DispatchProps {
  getNextMonth: () => void;
  getPrevMonth: () => void;
  getCurrentMonth: () => void;
}

/*  useEffect(() => {
    const syncTextbookParamsToStorage = () => {
      if (selectedSearchValue) localStorage.setItem('date', selectedSearchValue?.date);
    };
    syncTextbookParamsToStorage();
    window.addEventListener('beforeunload', syncTextbookParamsToStorage);

    return () => {
      window.removeEventListener('beforeunload', syncTextbookParamsToStorage);
    };
  }, [selectedSearchValue]); */

type Props = StateProps & DispatchProps;

const CalendarControl = ({
  date,
  getNextMonth,
  getPrevMonth,
  getCurrentMonth,
  isCurrentDate,
}: Props) => (
  <div className={styles.box}>
    <div className={styles.control}>
      <button className={styles.button} onClick={getPrevMonth}>
        <ArrowPrevIcon />
      </button>
      <div className={styles.text}>{date}</div>
      <button className={styles.button} onClick={getNextMonth}>
        <ArrowNextIcon />
      </button>
    </div>
    <button
      className={classNames(styles.extra, {
        [styles.active]: isCurrentDate,
      })}
      onClick={getCurrentMonth}
    >
      Сегодня
    </button>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  date: calendarDateSelector(state),
  isCurrentDate: isCurrentDateSelector(state),
});

const mapDispatchToProps = {
  getNextMonth,
  getPrevMonth,
  getCurrentMonth,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarControl);
