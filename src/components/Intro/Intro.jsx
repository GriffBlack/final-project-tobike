import React from 'react';
import styles from './introComponent.module.scss';

const Intro = () => {
  return (
    <div className={styles.introComponent}>
      <div className={styles.introComponentLeft}>
        <p className={styles.introComponentText}>
          Наслаждайтесь этим утром вместе с нами
        </p>
      </div>
      <div className={styles.introComponentRight}>
        <img src="images/travel.jpg" alt="travel" loading="lazy" />
      </div>
    </div>
  );
};

export default Intro;
