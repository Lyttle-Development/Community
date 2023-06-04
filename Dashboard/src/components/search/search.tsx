import styles from './search.module.scss';
import { componentsPrefix } from '@lyttledev-dashboard/components';
import { getMessage } from '@lyttledev-dashboard/utils';

export function Search() {
  const msgInputPlaceholder = getMessage(
    componentsPrefix + 'search.input-placeholder',
  );

  return (
    <form className={styles['search-container']}>
      <input
        type="text"
        className={styles['search-input']}
        placeholder={msgInputPlaceholder}
      />
      <button className={styles['search-button']}>Search</button>
    </form>
  );
}
