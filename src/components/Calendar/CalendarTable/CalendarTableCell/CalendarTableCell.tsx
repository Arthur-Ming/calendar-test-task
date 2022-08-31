import classNames from 'classnames';
import { connect } from 'react-redux';
import { ICalendarDay, IEvent } from '../../../../interfaces';
import { RootState } from '../../../../redux/reducer';
import { eventByDateSelector } from '../../../../redux/selectors';
import CalendarEvent from '../CalendarEvent';
import styles from './calendar-table-cell.module.scss';

interface StateProps {
  event?: IEvent;
}

interface OwnProps extends ICalendarDay {
  weekDay?: string;
}

type Props = OwnProps & StateProps;

const CalendarTableCell = ({ event, weekDay, dayOfMonth }: Props) => (
  <div
    className={classNames(styles.box, {
      [styles.has_event]: event,
    })}
  >
    <div className={styles.header}>
      {weekDay && <div>{`${weekDay},`}</div>}
      <div>{dayOfMonth}</div>
    </div>
    {event && <CalendarEvent event={event} />}
  </div>
);

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  event: eventByDateSelector(state, props),
});

export default connect(mapStateToProps)(CalendarTableCell);
