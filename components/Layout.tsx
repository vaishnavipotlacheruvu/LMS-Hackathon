import React, { useState } from 'react';
import { Role } from '../types';
import StaffView from './StaffView';
import StudentView from './StudentView';
import { HomeIcon, UsersIcon, BookOpenIcon, ChartBarIcon, LogoutIcon, ClipboardListIcon, CodeIcon, SparklesIcon, CollectionIcon } from '../constants';

interface LayoutProps {
  role: Role;
  onLogout: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      active
        ? 'bg-brand-primary text-white shadow-md'
        : 'text-gray-300 hover:bg-brand-dark hover:text-white'
    }`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span>{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ role, onLogout }) => {
  const studentNavs = ['My Courses', 'Course Catalog', 'My Grades', 'Assignments', 'Playground', 'Bonus Courses'];
  const staffNavs = ['Dashboard', 'Students', 'Courses', 'Assignments'];
  
  const [activeNav, setActiveNav] = useState(role === Role.STUDENT ? studentNavs[0] : staffNavs[0]);

  const renderNavItems = () => {
    if (role === Role.STUDENT) {
      return (
        <>
          <NavItem icon={BookOpenIcon} label="My Courses" active={activeNav === 'My Courses'} onClick={() => setActiveNav('My Courses')} />
          <NavItem icon={CollectionIcon} label="Course Catalog" active={activeNav === 'Course Catalog'} onClick={() => setActiveNav('Course Catalog')} />
          <NavItem icon={ChartBarIcon} label="My Grades" active={activeNav === 'My Grades'} onClick={() => setActiveNav('My Grades')} />
          <NavItem icon={ClipboardListIcon} label="Assignments" active={activeNav === 'Assignments'} onClick={() => setActiveNav('Assignments')} />
          <NavItem icon={CodeIcon} label="Playground" active={activeNav === 'Playground'} onClick={() => setActiveNav('Playground')} />
          <NavItem icon={SparklesIcon} label="Bonus Courses" active={activeNav === 'Bonus Courses'} onClick={() => setActiveNav('Bonus Courses')} />
        </>
      );
    }
    if (role === Role.STAFF) {
      return (
        <>
          <NavItem icon={HomeIcon} label="Dashboard" active={activeNav === 'Dashboard'} onClick={() => setActiveNav('Dashboard')} />
          <NavItem icon={UsersIcon} label="Students" active={activeNav === 'Students'} onClick={() => setActiveNav('Students')} />
          <NavItem icon={CollectionIcon} label="Courses" active={activeNav === 'Courses'} onClick={() => setActiveNav('Courses')} />
          <NavItem icon={ClipboardListIcon} label="Assignments" active={activeNav === 'Assignments'} onClick={() => setActiveNav('Assignments')} />
        </>
      );
    }
    return null;
  };
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <div className="text-2xl font-bold text-white mb-10 pl-2">
          Growth Cycles
        </div>
        <nav className="flex-1 space-y-2">
          {renderNavItems()}
        </nav>
        <div className="mt-auto">
           <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogoutIcon className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 z-10">
          <h1 className="text-xl font-semibold text-gray-700">Welcome, {role}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-gray-100">
          {role === Role.STAFF && <StaffView activeView={activeNav} />}
          {role === Role.STUDENT && <StudentView activeView={activeNav} />}
        </main>
      </div>
    </div>
  );
};

export default Layout;