import React from 'react';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const Header = ({ user }) => {
  return (
    <header className={styles.topHeader}>
      <div className={styles.headerLeft}>
        <button className={styles.menuBtn}><FontAwesomeIcon icon={faBars} /></button>
        <h1>Welcome back, <span className={styles.gradientText}>{user.name}!</span></h1>
        <p>Track your achievements and build your digital portfolio</p>
      </div>
      <div className={styles.headerRight}>
        <div className={styles.profileSection}>
            <div>
                <div className={styles.profileName}>{user.name}</div>
                <div className={styles.profileRole}>{user.role}</div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;