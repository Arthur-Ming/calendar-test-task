import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { IEvent } from '../../../interfaces';
import { RootState } from '../../../redux/reducer';
import {
  eventByDateSelector,
  userEventErrorSelector,
  userEventLoadingSelector,
} from '../../../redux/selectors';
import styles from './calendar-tooltip.module.scss';
import CalendarTooltipFormsAdd from './CalendarTooltipFormAdd';
import CalendarTooltipFormEdit from './CalendarTooltipFormEdit';
import { ReactComponent as CloseIcon } from './cross.svg';

interface OwnProps {
  date: string;
  onClose: () => void;
}

interface StateProps {
  userEventError: unknown | undefined;
  userEventLoading: boolean | undefined;
  event?: IEvent;
}

type Props = OwnProps & StateProps;

const CalendarTooltip = ({ date, onClose, event, userEventError, userEventLoading }: Props) => {
  if (userEventError) {
    toast.error('Failed to create event!'); //will be twice if React.StrictMode
  }
  return (
    <>
      <div onClick={onClose} className={styles.close}>
        <CloseIcon className={styles.close_icon} />
      </div>
      {event ? (
        <CalendarTooltipFormEdit userEventLoading={userEventLoading} event={event} />
      ) : (
        <CalendarTooltipFormsAdd userEventLoading={userEventLoading} date={date} />
      )}
    </>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  userEventError: userEventErrorSelector(state, props),
  userEventLoading: userEventLoadingSelector(state, props),
  event: eventByDateSelector(state, props),
});

export default connect(mapStateToProps)(CalendarTooltip);
