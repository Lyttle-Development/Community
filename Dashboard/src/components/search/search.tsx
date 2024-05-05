import styles from './search.module.scss';
import { componentsPrefix } from '@lyttledev-dashboard/components';
import { getMessage } from '@lyttledev-dashboard/utils';
import { useState } from 'react';

export function Search() {
  const [value, setValue] = useState('');
  const msgInputPlaceholder = getMessage(
    componentsPrefix + 'search.input-placeholder',
  );

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.alert('Searching currently not available. Try again later.');
    setValue('');
  };

  return (
    <form className={styles['search-container']}>
      <input
        type="text"
        className={styles['search-input']}
        placeholder={msgInputPlaceholder}
        onSubmit={submitSearch}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className={styles['search-button']} onClick={submitSearch}>
        Search
      </button>
    </form>
  );
}
