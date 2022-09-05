import classNames from 'classnames';
import { useState } from 'react';
import { connect } from 'react-redux';
import { IEvent } from '../../../../interfaces';
import { unSelectCell } from '../../../../redux/actions/calendar';
import { RootState } from '../../../../redux/reducer';
import { selectedEventSelector } from '../../../../redux/selectors/search';
import { calendarSelectedDaySelector } from '../../../../redux/selectors/calendar';
import toFormateDate from '../../../../utils/toFormateDate';
import CalendarHeaderControlTooltip from '../../CalendarTooltip/CalendarHeaderControlTooltip';
import styles from './calendar-header-control.module.scss';

interface DispatchProps {
  unSelectCell: () => void;
}

interface StateProps {
  selectedEvent: IEvent | null;
  selectedCell: string | null;
}

type Props = StateProps & DispatchProps;

const CalendarHeaderControl = ({ selectedEvent, selectedCell, unSelectCell }: Props) => {
  const [isOpenAddTooltip, setOpenAddTooltip] = useState(false);
  const [isOpenEditTooltip, setOpenEditTooltip] = useState(false);
  const date = toFormateDate(new Date());

  const onCloseAddTooltip = () => {
    setOpenAddTooltip(false);
  };
  const onCloseEditTooltip = () => {
    setOpenEditTooltip(false);
  };

  if (selectedCell) {
    isOpenAddTooltip && onCloseAddTooltip();
    isOpenEditTooltip && onCloseEditTooltip();
  }

  const onClickAdd = () => {
    setOpenAddTooltip(true);
    setOpenEditTooltip(false);
    unSelectCell();
  };
  const onClickEdit = () => {
    setOpenEditTooltip(true);
    setOpenAddTooltip(false);
    unSelectCell();
  };

  return (
    <div className={styles.buttons}>
      <div className={styles.button_wrapper}>
        <button
          className={classNames(styles.button, {
            [styles.active]: isOpenAddTooltip && !selectedCell,
          })}
          onClick={onClickAdd}
        >
          Добавить
        </button>
        {isOpenAddTooltip && !selectedCell && (
          <CalendarHeaderControlTooltip date={date} onClose={onCloseAddTooltip} />
        )}
      </div>
      <div className={styles.button_wrapper}>
        <button
          className={classNames(styles.button, {
            [styles.active]: isOpenEditTooltip && !selectedCell,
          })}
          onClick={onClickEdit}
          disabled={!Boolean(selectedEvent)}
        >
          Обновить
        </button>
        {isOpenEditTooltip && selectedEvent && !selectedCell && (
          <CalendarHeaderControlTooltip date={selectedEvent.date} onClose={onCloseEditTooltip} />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  unSelectCell,
};

const mapStateToProps = (state: RootState) => ({
  selectedEvent: selectedEventSelector(state),
  selectedCell: calendarSelectedDaySelector(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHeaderControl);
