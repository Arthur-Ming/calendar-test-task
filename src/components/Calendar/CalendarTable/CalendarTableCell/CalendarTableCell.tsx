import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import { ICalendarDay, IEvent } from '../../../../interfaces';
import { selectCell } from '../../../../redux/actions/calendar';
import { RootState } from '../../../../redux/reducer';
import {
  calendarSelectedDaySelector,
  eventByDateSelector,
  selectedEventSelector,
} from '../../../../redux/selectors';
import CalendarEvent from '../CalendarEvent';
import CalendarTooltip from '../CalendarTooltip';
import styles from './calendar-table-cell.module.scss';

interface StateProps {
  event?: IEvent;
  isSelectedDay: boolean;
  isSelectedEvent: boolean;
}

interface DispatchProps {
  onSelect: () => void;
}

interface OwnProps extends ICalendarDay {
  weekDay?: string;
}

type Props = OwnProps & StateProps & DispatchProps;

const CalendarTableCell = ({
  event,
  weekDay,
  dayOfMonth,
  onSelect,
  isSelectedDay,
  isSelectedEvent,
  date,
}: Props) => {
  const calendarTableCellRef: RefObject<HTMLDivElement> = useRef(null);

  return (
    <div className={styles.box}>
      <div
        className={classNames(styles.content, {
          [styles.has_event]: event,
          [styles.active]: isSelectedEvent || isSelectedDay,
        })}
        ref={calendarTableCellRef}
        onClick={onSelect}
      >
        <div className={styles.header}>
          {weekDay && <div>{`${weekDay},`}</div>}
          <div>{dayOfMonth}</div>
        </div>
        {event && <CalendarEvent event={event} />}
      </div>
      {isSelectedDay && (
        <CalendarTooltip date={date} event={event} calendarTableCellRef={calendarTableCellRef} />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  event: eventByDateSelector(state, props),
  isSelectedDay: calendarSelectedDaySelector(state) === props.date,
  isSelectedEvent: selectedEventSelector(state)?.date === props.date,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>, props: OwnProps) => ({
  onSelect: () => dispatch(selectCell(props.date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTableCell);
