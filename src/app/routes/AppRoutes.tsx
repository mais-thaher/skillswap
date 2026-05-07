// src/app/routes/AppRoutes.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import Dashboard from '../../features/dashboard/Dashboard';
import Home from '../../features/home/Home';
import ProfileSimple from '../../features/profile/ProfileSimple';
import Discover from '../../features/discover/Discover';

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
        path="/profile"
        element={
          <MainLayout>
            <ProfileSimple />
          </MainLayout>
        }
      />
      <Route
        path="/discover"
        element={
          <MainLayout>
            <Discover />
          </MainLayout>
        }
      />
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;