import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './BulletList.module.css';

const BulletList = () => {
  const items = [
    'Our comprehensive online courses',
    'Our highly effective online mentoring program',
    'Our innovative Buddy Hubs (Interview Forums)',
  ];

  return (
    <ul className={styles.bulletList}>
      {items.map((item, index) => (
        <li key={index} className={styles.bulletItem}>
          <FontAwesomeIcon icon={faCheckCircle} className={styles.bulletIcon} />
          {item}
        </li>
      ))}
    </ul>
  );
};

export default BulletList;
