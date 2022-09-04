import { AnyAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import classNames from 'classnames';
import { Dispatch, RefObject } from 'react';
import { connect } from 'react-redux';
import { IEvent } from '../../../../interfaces';
import { unSelectCell } from '../../../../redux/actions/calendar';
import { RootState } from '../../../../redux/reducer';
import { userEventErrorSelector, userEventLoadingSelector } from '../../../../redux/selectors';
import styles from './calendar-tooltip.module.scss';
import CalendarTooltipFormsAdd from './CalendarTooltipFormAdd';
import CalendarTooltipFormEdit from './CalendarTooltipFormEdit';
import { ReactComponent as CloseIcon } from './cross.svg';

interface OwnProps {
  calendarTableCellRef: RefObject<HTMLDivElement>;
  date: string;
  event?: IEvent;
}

interface StateProps {
  userEventError: unknown | undefined;
  userEventLoading: boolean | undefined;
}

interface DispatchProps {
  onClose: () => void;
}

type Props = OwnProps & DispatchProps & StateProps;

const CalendarTooltip = ({
  calendarTableCellRef,
  date,
  onClose,
  event,
  userEventError,
  userEventLoading,
}: Props) => {
  const documentWidth = document.body.clientWidth;
  const calendarTableCellElLeft =
    calendarTableCellRef.current && calendarTableCellRef.current.getBoundingClientRect().left;

  const calendarTableCellElWidth =
    calendarTableCellRef.current && calendarTableCellRef.current.clientWidth;

  const calendarTooltipRightShift =
    documentWidth - (calendarTableCellElLeft ?? 0) - (calendarTableCellElWidth ?? 0);

  if (userEventError) {
    toast.error('Failed to create event!'); //will be twice if React.StrictMode
  }

  return (
    <div
      className={classNames(styles.box, {
        [styles.box_left]: calendarTooltipRightShift < 300,
      })}
    >
      <div onClick={onClose} className={styles.close}>
        <CloseIcon className={styles.close_icon} />
      </div>
      {event ? (
        <CalendarTooltipFormEdit userEventLoading={userEventLoading} event={event} />
      ) : (
        <CalendarTooltipFormsAdd userEventLoading={userEventLoading} date={date} />
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  userEventError: userEventErrorSelector(state, props),
  userEventLoading: userEventLoadingSelector(state, props),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  onClose: () => dispatch(unSelectCell()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTooltip);
