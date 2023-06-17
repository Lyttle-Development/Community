import styles from './server-card-grid.module.scss';
import { useEffect, useState } from 'react';
import { Component } from '@lyttledev-dashboard/components';

interface ServerCardGridProps {
  servers: any[];
}

export function ServerCardGrid({ servers }: ServerCardGridProps) {
  const [refrech, setRefrech] = useState(true);
  const [items, setItems] = useState(<></>);

  const setList = () => {
    const list = (
      <>
        {servers.map((server, i) => (
          <Component.ServerCard key={i} {...server} />
        ))}
      </>
    );
    setItems(list);
  };

  useEffect(() => {
    if (refrech) {
      const timeout = setTimeout(() => {
        setList();
        setRefrech(false);
      }, 800);
      return () => {
        clearTimeout(timeout);
      };
    }
    setRefrech(true);
    const timeout = setTimeout(() => {
      setList();
      setRefrech(false);
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [servers]);

  return (
    <section className={`${styles.grid} ${refrech && styles.hide}`}>
      {items}
    </section>
  );
}
