import { Dispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { RefObject, useRef } from 'react';
import { connect } from 'react-redux';
import {
  ICalendarDay,
  IEvent,
  ISelectCellAction,
  ISetTooltipPathAction,
} from '../../../../interfaces';
import { selectCell } from '../../../../redux/actions/calendar';
import { RootState } from '../../../../redux/reducer';
import { eventByDateSelector } from '../../../../redux/selectors/events';
import CalendarEvent from '../CalendarEvent';
import styles from './calendar-table-cell.module.scss';
import { calendarSelectedDaySelector } from '../../../../redux/selectors/calendar';
import { setTooltipPath } from '../../../../redux/actions/tooltip';
import { tooltipPathSelector } from '../../../../redux/selectors/tooltip';
import CalendarCellTooltip from '../../CalendarTooltip/CalendarCellTooltip';

interface StateProps {
  event?: IEvent;
  isSelectedDay: boolean;
  isTooltipPath: boolean;
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
  isTooltipPath,
  date,
}: Props) => {
  const calendarTableCellRef: RefObject<HTMLDivElement> = useRef(null);

  return (
    <div className={styles.box}>
      <div
        className={classNames(styles.content, {
          [styles.has_event]: event,
          [styles.active]: isSelectedDay,
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
      {isTooltipPath && isSelectedDay && (
        <CalendarCellTooltip date={date} calendarTableCellRef={calendarTableCellRef} />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  event: eventByDateSelector(state, props),
  isSelectedDay: calendarSelectedDaySelector(state) === props.date,
  isTooltipPath: tooltipPathSelector(state) === props.date,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ISelectCellAction | ISetTooltipPathAction>,
  props: OwnProps
) => ({
  onSelect: () => {
    dispatch(selectCell(props.date));
    dispatch(setTooltipPath(props.date));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTableCell);
