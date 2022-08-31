import { ReactComponent as ArrowPrevIcon } from './arrow-prev.svg';
import { ReactComponent as ArrowNextIcon } from './arrow-next.svg';
import styles from './calendar-control.module.scss';
import { connect } from 'react-redux';
import { calendarDateSelector } from '../../../redux/selectors';
import { RootState } from '../../../redux/reducer';
import { getCurrentMonth, getNextMonth, getPrevMonth } from '../../../redux/actions/calendar';

interface StateProps {
  date: string | null;
}

interface DispatchProps {
  getNextMonth: () => void;
  getPrevMonth: () => void;
  getCurrentMonth: () => void;
}

type Props = StateProps & DispatchProps;

const CalendarControl = ({ date, getNextMonth, getPrevMonth, getCurrentMonth }: Props) => (
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
    <button className={styles.extra} onClick={getCurrentMonth}>
      Сегодня
    </button>
  </div>
);

const mapStateToProps = (state: RootState) => ({
  date: calendarDateSelector(state),
});

const mapDispatchToProps = {
  getNextMonth,
  getPrevMonth,
  getCurrentMonth,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarControl);
