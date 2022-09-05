import { ReactComponent as ArrowPrevIcon } from './arrow-prev.svg';
import { ReactComponent as ArrowNextIcon } from './arrow-next.svg';
import styles from './calendar-control.module.scss';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/reducer';
import { getCurrentMonth, getNextMonth, getPrevMonth } from '../../../redux/actions/calendar';
import classNames from 'classnames';
import { useEffect } from 'react';
import {
  calendarMonthSelector,
  calendarSelectedDaySelector,
  calendarYearSelector,
} from '../../../redux/selectors/calendar';
import toFormateDate from '../../../utils/toFormateDate';
import toFormatDateForControl from './toFormatDateForControl';

interface StateProps {
  month: number | null;
  year: number | null;
  isCurrentDate: boolean;
}

interface DispatchProps {
  getNextMonth: () => void;
  getPrevMonth: () => void;
  getCurrentMonth: () => void;
}

type Props = StateProps & DispatchProps;

const CalendarControl = ({
  month,
  year,
  getNextMonth,
  getPrevMonth,
  getCurrentMonth,
  isCurrentDate,
}: Props) => {
  /* useEffect(() => {
    const syncCalendarParamsToStorage = () => {
      localStorage.setItem('year', String(year));
      localStorage.setItem('month', String(month));
    };

    window.addEventListener('beforeunload', syncCalendarParamsToStorage);

    return () => {
      window.removeEventListener('beforeunload', syncCalendarParamsToStorage);
    };
  }, [month, year]); */

  return (
    <div className={styles.box}>
      <div className={styles.control}>
        <button className={styles.button} onClick={getPrevMonth}>
          <ArrowPrevIcon />
        </button>
        <div className={styles.text}>{toFormatDateForControl(year, month)}</div>
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
};

const mapStateToProps = (state: RootState) => ({
  month: calendarMonthSelector(state),
  year: calendarYearSelector(state),
  isCurrentDate: calendarSelectedDaySelector(state) === toFormateDate(new Date()),
});

const mapDispatchToProps = {
  getNextMonth,
  getPrevMonth,
  getCurrentMonth,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarControl);
