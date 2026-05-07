// src/app/layout/Navbar.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Bell,
  Grid2X2,
  Menu,
  MessageSquare,
  Search,
  User,
  X,
  Zap,
  Sparkles,
  LogOut,
  Settings,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../core/simple';
import { supabase } from '../../services/supabase/client';

interface UserProfile {
  full_name?: string;
  profile_completed?: boolean;
  bio?: string;
  location?: string;
  languages?: string[];
  avatar_url?: string;
}

const Navbar: React.FC = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [unreadMessages, setUnreadMessages] = useState(2);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await signOut();
    setIsDropdownOpen(false);
    navigate('/');
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = (profile: UserProfile | null): number => {
    if (!profile) return 0;
    
    const fields = [
      profile.full_name,
      profile.bio,
      profile.location,
      profile.languages && profile.languages.length > 0,
      profile.avatar_url,
    ];
    
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name, profile_completed, bio, location, languages, avatar_url')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        if (data) {
          setProfile(data);
          setProfileCompletion(calculateProfileCompletion(data));
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      }
    };
    
    fetchProfile();
  }, [user]);

  const navItems = [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: <Grid2X2 className="h-5 w-5" />,
      description: 'Your learning hub',
    },
    {
      label: 'Discover',
      to: '/discover',
      icon: <Search className="h-5 w-5" />,
      description: 'Find skills & people',
    },
    {
      label: 'Profile',
      to: '/profile',
      icon: <User className="h-5 w-5" />,
      description: 'Manage your profile',
    },
  ];

  return (
    <header className={`sticky top-0 z-50 px-3 pt-2 transition-all duration-500 ${isScrolled ? 'pt-1.5' : 'pt-2'}`}>
      <nav className={`mx-auto flex max-w-7xl items-center justify-between rounded-xl border bg-white/95 px-4 py-2 shadow-md backdrop-blur-xl transition-all duration-500 ${
        isScrolled 
          ? 'border-white/80 shadow-purple-200/20 py-1.5' 
          : 'border-white/60 shadow-purple-200/10 py-2 hover:shadow-purple-300/20'
      }`}>
        {/* Logo */}
        <Link to="/" onClick={() => setIsOpen(false)} className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-purple-300 overflow-hidden">
            {/* Shimmer effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <Sparkles className="h-5 w-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          </div>

          <div className="leading-tight">
            <div className="text-xl font-extrabold text-gray-900">
              Skill<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Swap</span>
            </div>
            <div className="text-xs font-semibold tracking-widest text-gray-400">
              EXCHANGE & LEARN
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center space-x-1 rounded-xl bg-gray-50/80 p-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-sm shadow-indigo-100'
                    : 'text-gray-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {item.icon}
                  </span>
                  <span className="relative">
                    {item.label}
                    {/* Hover tooltip */}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
                      {item.description}
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
                    </span>
                  </span>
                  {isActive && (
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-indigo-600 flex-shrink-0 relative">
                      <span className="absolute inset-0 rounded-full bg-indigo-600 animate-ping opacity-60" />
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-1 md:flex">
          {isAuthenticated ? (
            <>
              {/* Notifications - Only show when logged in */}
              <button className="group relative p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300">
                <Bell className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60" />
                  </span>
                )}
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Notifications
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
                </span>
              </button>

              {/* Messages */}
              <button className="group relative p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-300">
                <MessageSquare className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                {unreadMessages > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {unreadMessages}
                  </span>
                )}
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  Messages
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900" />
                </span>
              </button>

              <div className="h-8 w-px bg-gray-200 mx-1" />

              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`group flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-300 ${
                    isDropdownOpen ? 'bg-indigo-50 shadow-md' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      {profile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    {/* Online indicator */}
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-800 max-w-[140px] truncate group-hover:text-indigo-700 transition-colors duration-200">
                      {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 max-w-[140px] truncate">{user?.email}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    
                    <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/60 bg-white/95 shadow-2xl shadow-purple-200/30 backdrop-blur-xl z-50 overflow-hidden">
                      {/* User Info Section */}
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                            {profile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                          </div>
                        </div>
                        
                        {/* Profile Completion */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Profile Completion
                            </span>
                            <span className={`font-semibold ${profileCompletion >= 80 ? 'text-green-600' : profileCompletion >= 50 ? 'text-yellow-600' : 'text-orange-600'}`}>
                              {profileCompletion}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                profileCompletion >= 80 ? 'bg-green-500' : 
                                profileCompletion >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
                              }`}
                              style={{ width: `${profileCompletion}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200"
                        >
                          <User className="h-4 w-4" />
                          My Profile
                        </Link>
                        
                        <Link
                          to="/settings"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        
                        <Link
                          to="/help"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200"
                        >
                          <HelpCircle className="h-4 w-4" />
                          Help & Support
                        </Link>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-gray-100" />

                      {/* Sign Out */}
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="group px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all duration-300"
              >
                <span className="group-hover:tracking-wide transition-all duration-300">Sign In</span>
              </Link>

              <Link
                to="/register"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-300/40 hover:-translate-y-0.5"
              >
                <Zap className="h-4 w-4 group-hover:animate-pulse" />
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative rounded-xl p-2.5 text-gray-600 transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 md:hidden overflow-hidden"
        >
          <span className={`absolute inset-0 bg-indigo-100 transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-0'} rounded-xl`} />
          <span className="relative z-10">
            {isOpen ? (
              <X className="h-6 w-6 transform transition-transform duration-300 rotate-0" />
            ) : (
              <Menu className="h-6 w-6 transform transition-transform duration-300" />
            )}
          </span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute inset-x-0 top-[72px] z-40 mx-3 rounded-xl border border-white/60 bg-white/95 shadow-xl shadow-purple-200/20 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-6 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.icon}
                    {item.label}
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 flex-shrink-0 relative">
                        <span className="absolute inset-0 rounded-full bg-indigo-600 animate-ping opacity-60" />
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-gray-100 px-6 py-4">
            {isAuthenticated ? (
              <div className="space-y-4">
                {/* Mobile User Info */}
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                    {profile?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {profile?.full_name || user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email || ''}</p>
                  </div>
                </div>

                {/* Mobile Profile Completion */}
                <div className="px-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Profile Completion
                    </span>
                    <span className={`font-semibold ${profileCompletion >= 80 ? 'text-green-600' : profileCompletion >= 50 ? 'text-yellow-600' : 'text-orange-600'}`}>
                      {profileCompletion}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        profileCompletion >= 80 ? 'bg-green-500' : 
                        profileCompletion >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${profileCompletion}%` }}
                    />
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-1 pt-2">
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200"
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  
                  <Link
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  
                  <Link
                    to="/help"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-xl transition-all duration-200"
                  >
                    <HelpCircle className="h-4 w-4" />
                    Help & Support
                  </Link>
                </div>

                {/* Mobile Logout Button */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 text-center text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200"
                >
                  <Zap className="h-4 w-4" />
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;