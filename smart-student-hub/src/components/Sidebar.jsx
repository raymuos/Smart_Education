import React from 'react';
import styles from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ onLogout }) => {
  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faGraduationCap} />
          <h2>Smart Student Hub</h2>
        </div>
        <nav className={styles.nav}>
          <ul>
            {/* Add nav items here using styles.navItem */}
            <li className={styles.navItem}>Dashboard</li>
            <li className={styles.navItem}>Activities</li>
          </ul>
        </nav>
      </div>
      <button className={styles.logoutBtn} onClick={onLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;