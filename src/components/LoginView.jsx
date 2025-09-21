import React from 'react';
import styles from './LoginView.module.css'; // Import the CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faArrowRight, faUserGraduate, faChalkboardTeacher, faUserShield, faShieldAlt, faMobileAlt, faCloud } from '@fortawesome/free-solid-svg-icons';

const LoginView = ({ onLogin }) => {
  return (
    <div className="view active">
      <div className={styles.loginBackground}></div>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.logoSection}>
              <FontAwesomeIcon icon={faGraduationCap} />
              <h1>Smart Student Hub</h1>
            </div>
            <p className={styles.loginSubtitle}>Empowering students with digital portfolios</p>
          </div>
          <div className={styles.roleSelection}>
            <h2>Choose Your Role</h2>
            <p>Select how you'd like to access the platform</p>
            <div className={styles.roleCardsLandscape}>
              <div className={`${styles.roleCard} ${styles.studentCard}`} onClick={() => onLogin('student')}>
                <div className={styles.roleIcon}><FontAwesomeIcon icon={faUserGraduate} /></div>
                <div className={styles.roleContent}>
                  <h3>Student</h3>
                  <p>Track achievements, build portfolio, and showcase your journey</p>
                </div>
                <div className={styles.roleArrow}><FontAwesomeIcon icon={faArrowRight} /></div>
              </div>
              <div className={`${styles.roleCard} ${styles.facultyCard}`} onClick={() => onLogin('faculty')}>
                <div className={styles.roleIcon}><FontAwesomeIcon icon={faChalkboardTeacher} /></div>
                <div className={styles.roleContent}>
                  <h3>Faculty</h3>
                  <p>Manage students, approve activities, and track academic progress</p>
                </div>
                <div className={styles.roleArrow}><FontAwesomeIcon icon={faArrowRight} /></div>
              </div>
              <div className={`${styles.roleCard} ${styles.adminCard}`} onClick={() => onLogin('admin')}>
                <div className={styles.roleIcon}><FontAwesomeIcon icon={faUserShield} /></div>
                <div className={styles.roleContent}>
                  <h3>Admin</h3>
                  <p>Control website, manage users, and oversee system operations</p>
                </div>
                <div className={styles.roleArrow}><FontAwesomeIcon icon={faArrowRight} /></div>
              </div>
            </div>
          </div>
          <div className={styles.loginFooter}>
            <div className={styles.featuresPreview}>
              <div className={styles.featureItem}><FontAwesomeIcon icon={faShieldAlt} /><span>Secure & Verified</span></div>
              <div className={styles.featureItem}><FontAwesomeIcon icon={faMobileAlt} /><span>Mobile Friendly</span></div>
              <div className={styles.featureItem}><FontAwesomeIcon icon={faCloud} /><span>Cloud Sync</span></div>
            </div>
            <div className={styles.loginHelp}><p>Need help? <a href="#">Contact Support</a></p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;