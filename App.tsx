import React, { useState } from 'react';
import { Role } from './types';
import LoginScreen from './components/LoginScreen';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [loggedInRole, setLoggedInRole] = useState<Role | null>(null);

  const handleLogin = (selectedRole: Role) => {
    setLoggedInRole(selectedRole);
  };

  const handleLogout = () => {
    setLoggedInRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {loggedInRole ? (
        <Layout role={loggedInRole} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;