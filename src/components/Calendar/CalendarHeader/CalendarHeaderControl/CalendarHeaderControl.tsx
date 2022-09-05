import classNames from 'classnames';
import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { IAction, IEvent, ISetTooltipPathAction } from '../../../../interfaces';
import { unSelectCell } from '../../../../redux/actions/calendar';
import { RootState } from '../../../../redux/reducer';
import { selectedEventSelector } from '../../../../redux/selectors/search';
import toFormateDate from '../../../../utils/toFormateDate';
import CalendarHeaderControlTooltip from '../../CalendarTooltip/CalendarHeaderControlTooltip';
import styles from './calendar-header-control.module.scss';
import { tooltipPathSelector } from '../../../../redux/selectors/tooltip';
import { setTooltipPath } from '../../../../redux/actions/tooltip';
import { ADD_FROM_CONTROL, EDIT_FROM_CONTROL, TOOLTIP_PATH } from '../../../../redux/constants';

interface DispatchProps {
  onClickAdd: () => void;
  onClickEdit: () => void;
  onCloseTooltip: () => void;
}

interface StateProps {
  isAddTooltip: boolean;
  isEditTooltip: boolean;
  selectedEvent: IEvent | null;
}

type Props = StateProps & DispatchProps;

const CalendarHeaderControl = ({
  isAddTooltip,
  isEditTooltip,
  onClickAdd,
  onClickEdit,
  onCloseTooltip,
  selectedEvent,
}: Props) => {
  const date = toFormateDate(new Date());
  return (
    <div className={styles.buttons}>
      <div className={styles.button_wrapper}>
        <button
          className={classNames(styles.button, {
            [styles.active]: isAddTooltip,
          })}
          onClick={onClickAdd}
          disabled={Boolean(selectedEvent)}
        >
          Добавить
        </button>
        {isAddTooltip && <CalendarHeaderControlTooltip date={date} onClose={onCloseTooltip} />}
      </div>
      <div className={styles.button_wrapper}>
        <button
          className={classNames(styles.button, {
            [styles.active]: isEditTooltip,
          })}
          onClick={onClickEdit}
          disabled={!Boolean(selectedEvent)}
        >
          Обновить
        </button>
        {isEditTooltip && selectedEvent && (
          <CalendarHeaderControlTooltip date={selectedEvent.date} onClose={onCloseTooltip} />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ISetTooltipPathAction | IAction>) => ({
  onClickAdd: () => {
    dispatch(setTooltipPath(TOOLTIP_PATH + ADD_FROM_CONTROL));
    dispatch(unSelectCell());
  },
  onClickEdit: () => {
    dispatch(setTooltipPath(TOOLTIP_PATH + EDIT_FROM_CONTROL));
    dispatch(unSelectCell());
  },
  onCloseTooltip: () => {
    dispatch(setTooltipPath(null));
  },
});

const mapStateToProps = (state: RootState) => ({
  isAddTooltip: tooltipPathSelector(state) === TOOLTIP_PATH + ADD_FROM_CONTROL,
  isEditTooltip: tooltipPathSelector(state) === TOOLTIP_PATH + EDIT_FROM_CONTROL,
  selectedEvent: selectedEventSelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeaderControl);
