import styles from '../search-bar.module.scss';
import { IEvent, IEventWithFormatedDate } from '../../../../../interfaces';
import { connect } from 'react-redux';
import { eventsListSelector, selectedEventSelector } from '../../../../../redux/selectors';
import { RootState } from '../../../../../redux/reducer';
import filterEventsList from '../filterEventsList';
import { selectSearchValue } from '../../../../../redux/actions/search';
import classNames from 'classnames';

interface OwnProps {
  searchValue: string;
  onSelectedItemClick: () => void;
}
interface DispatchProps {
  selectSearchValue: (value: string) => void;
}

interface StateProps {
  eventsList: IEventWithFormatedDate[];
  selectedSearchValue: IEvent | null;
}

type Props = OwnProps & StateProps & DispatchProps;

const SearchBarList = ({
  searchValue,
  eventsList,
  selectSearchValue,
  onSelectedItemClick,
  selectedSearchValue,
}: Props) => {
  const filteredEventsList = filterEventsList<IEventWithFormatedDate>(searchValue, eventsList);
  return (
    <div className={styles.list_wrapper}>
      <ul className={styles.list}>
        {!filteredEventsList.length && (
          <li className={styles.no_item}>
            <span className={styles.date}>ничего не найдено</span>
          </li>
        )}
        {filteredEventsList.map((item) => (
          <li
            key={item.id}
            className={classNames(styles.item, {
              [styles.active]: item.id === selectedSearchValue?.id,
            })}
            onClick={() => {
              selectSearchValue(item.date);
              item.id === selectedSearchValue?.id && onSelectedItemClick();
            }}
          >
            <span className={styles.title}>{item.title}</span>
            <span className={styles.date}>{item.formatedDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  eventsList: eventsListSelector(state),
  selectedSearchValue: selectedEventSelector(state),
});
const mapDispatchToProps = {
  selectSearchValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarList);
