// src/app/layout/Sidebar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden md:flex md:flex-col md:w-64 md:bg-gray-800 md:text-white">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-xl font-bold">Menu</span>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="/profile" className="block py-2 px-4 rounded hover:bg-gray-700">
            Profile
          </Link>
          <Link to="/skills" className="block py-2 px-4 rounded hover:bg-gray-700">
            Skills
          </Link>
          <Link to="/requests" className="block py-2 px-4 rounded hover:bg-gray-700">
            Requests
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;