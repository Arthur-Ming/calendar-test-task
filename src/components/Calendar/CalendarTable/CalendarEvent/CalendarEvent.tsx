import { IEvent } from '../../../../interfaces';
import styles from './calendar-event.module.scss';

interface OwnProps {
  event: IEvent;
}

type Props = OwnProps;

const CalendarEvent = ({ event }: Props) => {
  const { title, participantsNames } = event;
  return (
    <div className={styles.box}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.participants}>
        {participantsNames.map((name, index) => (
          <div key={name}>
            {name}
            {index !== participantsNames.length - 1 && <span>,</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarEvent;
