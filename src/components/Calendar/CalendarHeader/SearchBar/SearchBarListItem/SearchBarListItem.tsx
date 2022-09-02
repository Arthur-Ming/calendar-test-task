import { IEvent } from '../../../../../interfaces';
import styles from '../search-bar.module.scss';

interface Props {
  item: IEvent;
}

const SearchBarListItem = ({ item }: Props) => {
  return (
    <li className={styles.item}>
      <span className={styles.title}>{item.title}</span>
      <span className={styles.date}>{item.date}</span>
    </li>
  );
};

export default SearchBarListItem;
