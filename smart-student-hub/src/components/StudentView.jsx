import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './Dashboard.module.css';

const StudentView = ({ user, onLogout }) => {
  return (
    <div className="view active">
      <div className={styles.dashboard}>
        <Sidebar onLogout={onLogout} />
        <main className={styles.mainContent}>
          <Header user={user} />
          <div className={`${styles.dashboardContent} active`}>
            <h2>Student Dashboard Content</h2>
            {/* All student-specific content goes here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentView;