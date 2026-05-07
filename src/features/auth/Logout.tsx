// src/features/auth/Logout.tsx
// Comprehensive logout page
 
import React, { useEffect } from 'react';
import { useAuth } from '../../core/simple';
 
const Logout: React.FC = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      try {
        console.log('🚪 Logging out user...');

        // Perform logout
        await signOut();

        // Redirect to home page after logout
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);

      } catch (error) {
        console.error('🚪 Logout error:', error);
        // Force redirect even on error
        window.location.href = '/';
      }
    };

    performLogout();
  }, [signOut]);
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Signing out...</h2>
        <p className="text-gray-600">Clearing your session and redirecting to login</p>
      </div>
    </div>
  );
};
 
export default Logout;