import classNames from 'classnames';
import styles from '../calendar-tooltip.module.scss';
import CalendarTooltip from '../CalendarTooltip';

interface OwnProps {
  onClose: () => void;
  date: string;
}

type Props = OwnProps;

const CalendarHeaderControlTooltip = ({ date, onClose }: Props) => (
  <div className={classNames(styles.box, styles.box_bottom)}>
    <CalendarTooltip date={date} onClose={onClose} />
  </div>
);

export default CalendarHeaderControlTooltip;
