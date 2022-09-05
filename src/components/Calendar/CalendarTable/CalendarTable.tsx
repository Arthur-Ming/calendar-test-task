import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ICalendarDay } from '../../../interfaces';
import { getDays } from '../../../redux/actions/calendar';
import { RootState } from '../../../redux/reducer';
import {
  calendarDaysSelector,
  calendarMonthSelector,
  calendarYearSelector,
} from '../../../redux/selectors/calendar';
import styles from '../calendar.module.scss';
import CalendarTableCell from './CalendarTableCell';

const weekDays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

interface StateProps {
  month: number | null;
  year: number | null;
  days: ICalendarDay[];
}

interface DispatchProps {
  getDays: (year: number | null, month: number | null) => void;
}

type Props = StateProps & DispatchProps;

const CalendarTable = ({ month, year, days, getDays }: Props) => {
  useEffect(() => {
    getDays(year, month);
  }, [getDays, month, year]);

  return (
    <div className={styles.box}>
      <div className={styles.table}>
        {days.map((day, index) => (
          <CalendarTableCell key={day.date} {...day} weekDay={weekDays[index]} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  month: calendarMonthSelector(state),
  year: calendarYearSelector(state),
  days: calendarDaysSelector(state),
});

const mapDispatchToProps = {
  getDays,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTable);
