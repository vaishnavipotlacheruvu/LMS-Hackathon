import React, { useState } from 'react';
import { Role } from '../types';
import { GraduationCapIcon } from '../constants';

interface LoginScreenProps {
  onLogin: (role: Role) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>(Role.STUDENT);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically have authentication logic.
    // For this mock app, we'll just log the user in.
    onLogin(selectedRole);
  };

  const TabButton: React.FC<{ tab: 'login' | 'register', children: React.ReactNode }> = ({ tab, children }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-1/2 pb-2 font-semibold text-center transition-colors border-b-2 ${
        activeTab === tab 
          ? 'border-brand-primary text-brand-primary' 
          : 'border-transparent text-gray-500 hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  );
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 p-4">
      <div className="text-center text-white mb-8">
        <div className="inline-block bg-white p-4 rounded-full mb-4">
          <GraduationCapIcon className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold">EduHub LMS</h1>
        <p className="text-lg text-blue-200">Your gateway to knowledge</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
        <p className="text-gray-500 mb-6">
          {activeTab === 'login' ? 'Sign in to your account' : 'Create a new one'}
        </p>

        <div className="flex border-b mb-6">
          <TabButton tab="login">Login</TabButton>
          <TabButton tab="register">Register</TabButton>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={Role.STUDENT}
                    checked={selectedRole === Role.STUDENT}
                    onChange={() => setSelectedRole(Role.STUDENT)}
                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary"
                  />
                  <span className="ml-2 text-gray-700">Student</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value={Role.STAFF}
                    checked={selectedRole === Role.STAFF}
                    onChange={() => setSelectedRole(Role.STAFF)}
                    className="h-4 w-4 text-brand-primary focus:ring-brand-primary"
                  />
                  <span className="ml-2 text-gray-700">Staff</span>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {activeTab === 'login' ? 'Sign In' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;