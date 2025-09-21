import React, { useState, useEffect } from 'react';
import LoginView from './components/LoginView';
import StudentView from './components/StudentView';
import FacultyView from './components/FacultyView';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (role) => {
    const newUser = {
      role: role,
      name: role === 'student' ? 'Barshita' : role === 'faculty' ? 'Dr. Smith' : 'Admin User',
    };
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  if (user.role === 'student') {
    return <StudentView user={user} onLogout={handleLogout} />;
  } else {
    return <FacultyView user={user} onLogout={handleLogout} />;
  }
}

export default App;