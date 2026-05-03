// src/app/routes/AppRoutes.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import Dashboard from '../../features/dashboard/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/"
        element={
          <MainLayout>
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SkillSwap</h1>
              <p className="text-lg text-gray-600">Exchange skills with others in your community.</p>
            </div>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;