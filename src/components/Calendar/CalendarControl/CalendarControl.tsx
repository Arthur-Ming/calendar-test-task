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
  calendarYearSelector,
  isCurrentDateSelector,
} from '../../../redux/selectors/calendar';

const toFormatDateForControl = (year: number | null, month: number | null) => {
  if (year === null || month === null) return null;
  const date = new Date(year, month).toLocaleDateString('ru', {
    year: 'numeric',
    month: 'long',
  });
  const [currentMonth, currentYear] = date.split(' ');
  return `${currentMonth[0].toUpperCase()}${currentMonth.slice(1)} ${currentYear}`;
};

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
  useEffect(() => {
    const syncCalendarParamsToStorage = () => {
      localStorage.setItem('year', String(year));
      localStorage.setItem('month', String(month));
    };

    window.addEventListener('beforeunload', syncCalendarParamsToStorage);

    return () => {
      window.removeEventListener('beforeunload', syncCalendarParamsToStorage);
    };
  }, [month, year]);

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
  isCurrentDate: isCurrentDateSelector(state),
});

const mapDispatchToProps = {
  getNextMonth,
  getPrevMonth,
  getCurrentMonth,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarControl);
