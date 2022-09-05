import classNames from 'classnames';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import styles from '../calendar-tooltip-forms.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { connect } from 'react-redux';
import { addEvent } from '../../../../redux/actions/events';
import { IEvent } from '../../../../interfaces';
import toFormateDate from '../../../../utils/toFormateDate';

registerLocale('ru', ru);

interface DispatchProps {
  addEvent: (newEvent: Omit<IEvent, 'id'>) => void;
}

interface OwnProps {
  date: string;
  userEventLoading: boolean | undefined;
}

type Props = OwnProps & DispatchProps;

type Inputs = {
  title: string;
  participantsNames: string;
  date: Date;
  description: string;
};

const CalendarTooltipFormAdd = ({ date, addEvent, userEventLoading }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    addEvent({
      ...data,
      participantsNames: data.participantsNames.split(','),
      date: toFormateDate(data.date),
    });
  };
  const onDelete = () => reset();

  return (
    <form className={styles.box}>
      <input
        autoFocus
        disabled={userEventLoading}
        className={classNames(styles.input, {
          [styles.invalid]: errors.title,
        })}
        {...register('title', {
          required: 'required',
        })}
      />
      <Controller
        control={control}
        name="date"
        defaultValue={new Date(date)}
        render={({ field }) => (
          <DatePicker
            disabled={userEventLoading}
            className={styles.input}
            onChange={(e) => field.onChange(e)}
            selected={field.value}
            dateFormat="d MMMM, yyyy"
            locale="ru"
            placeholderText="День, месяц, год"
          />
        )}
      />
      <input
        disabled={userEventLoading}
        className={styles.input}
        {...register('participantsNames')}
      />

      <textarea
        disabled={userEventLoading}
        className={styles.textarea}
        {...register('description')}
      />
      <div className={styles.buttons}>
        <input
          disabled={userEventLoading}
          onClick={handleSubmit(onSubmit)}
          className={styles.button}
          type="submit"
          value="Готово"
        />
        <input
          disabled={userEventLoading}
          type="button"
          value="Очистить"
          onClick={onDelete}
          className={styles.button}
        />
      </div>
    </form>
  );
};

const mapDispatchToProps = {
  addEvent,
};

export default connect(null, mapDispatchToProps)(CalendarTooltipFormAdd);
