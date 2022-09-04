import { SubmitHandler, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { IEvent } from '../../../../../interfaces';
import { editEvent } from '../../../../../redux/actions/events';
import styles from '../calendar-tooltip-forms.module.scss';

type Inputs = {
  description: string;
};

interface DispatchProps {
  editEvent: (eventId: string, date: string, newDescription: string) => void;
}

interface OwnProps {
  event: IEvent;
  userEventLoading: boolean | undefined;
}

type Props = OwnProps & DispatchProps;

const CalendarTooltipFormEdit = ({ event, userEventLoading, editEvent }: Props) => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    editEvent(event.id, event.date, data?.description);
  };
  const onDelete = () => reset();

  return (
    <div>
      <div className={styles.text}>
        <h4 className={styles.title}>{event.title}</h4>
        <div>
          {new Date(event.date).toLocaleDateString('ru', {
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div>
          <div className={styles.participants}>Участники:</div>
          {event.participantsNames.join(', ')}
        </div>
      </div>
      <form className={styles.box}>
        <textarea
          defaultValue={event.description}
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
            value="Удалить"
            onClick={onDelete}
            className={styles.button}
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  editEvent,
};

export default connect(null, mapDispatchToProps)(CalendarTooltipFormEdit);
