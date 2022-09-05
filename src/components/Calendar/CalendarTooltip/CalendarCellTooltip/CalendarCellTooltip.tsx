import classNames from 'classnames';
import { RefObject } from 'react';
import { connect } from 'react-redux';
import { unSelectCell } from '../../../../redux/actions/calendar';
import styles from '../calendar-tooltip.module.scss';
import CalendarTooltip from '../CalendarTooltip';

interface OwnProps {
  calendarTableCellRef: RefObject<HTMLDivElement>;
  date: string;
}

interface DispatchProps {
  onClose: () => void;
}

type Props = OwnProps & DispatchProps;

const CalendarCellTooltip = ({ calendarTableCellRef, date, onClose }: Props) => {
  const documentWidth = document.body.clientWidth;
  const calendarTableCellElLeft =
    calendarTableCellRef.current && calendarTableCellRef.current.getBoundingClientRect().left;

  const calendarTableCellElWidth =
    calendarTableCellRef.current && calendarTableCellRef.current.clientWidth;

  const calendarTooltipRightShift =
    documentWidth - (calendarTableCellElLeft ?? 0) - (calendarTableCellElWidth ?? 0);

  return (
    <div
      className={classNames(styles.box, {
        [styles.box_left]: calendarTooltipRightShift < 300,
      })}
    >
      <CalendarTooltip date={date} onClose={onClose} />
    </div>
  );
};

const mapDispatchToProps = {
  onClose: unSelectCell,
};

export default connect(null, mapDispatchToProps)(CalendarCellTooltip);
