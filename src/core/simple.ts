// src/core/simple.ts
// 🚀 Simplified Core System - Easy & Working

import { createClient, type User } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '../services/supabase/client';

// 🔐 Simple Auth
class SimpleAuth {
  private supabase = supabaseClient;

  async signUp(email: string, password: string, name: string) {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
 
      if (error) return { success: false, error: error.message };
      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  }
 
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });
 
      if (error) return { success: false, error: error.message };
      return { success: true, message: 'Welcome back!' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  }
 
  async signOut() {
    try {
      await this.supabase.auth.signOut();
      return { success: true, message: 'Logged out successfully' };
    } catch (error) {
      return { success: false, error: 'Logout failed' };
    }
  }
 
  async getCurrentUser() {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      return user;
    } catch {
      return null;
    }
  }
 
  onAuthChange(callback: (user: User | null) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  }
}
 
// 📦 Simple Storage
class SimpleStorage {
  private prefix = 'skillswap_';
 
  get(key: string): any {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }
 
  set(key: string, value: any): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  }
 
  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
 
  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}
 
// Simple API - Reuse same client instance
class SimpleAPI {
  private supabase: ReturnType<typeof createClient>;
 
  async get(endpoint: string) {
    try {
      // For Supabase tables
      if (endpoint.startsWith('/users/')) {
        const userId = endpoint.replace('/users/', '');
        const { data, error } = await this.supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();
        return { success: !error, data, error: error?.message };
      }

      if (endpoint === '/users') {
        const { data, error } = await this.supabase
          .from('users')
          .select('*');
        return { success: !error, data, error: error?.message };
      }

      return { success: false, error: 'Endpoint not found' };
    } catch (error) {
      return { success: false, error: 'API request failed' };
    }
  }

  async post(endpoint: string, data: any) {
    try {
      if (endpoint === '/users') {
        const { data: result, error } = await this.supabase
          .from('users')
          .insert(data)
          .select()
          .single();
        return { success: !error, data: result, error: error?.message };
      }

      return { success: false, error: 'Endpoint not found' };
    } catch (error) {
      return { success: false, error: 'API request failed' };
    }
  }

  async patch(endpoint: string, data: any) {
    try {
      if (endpoint.startsWith('/users/')) {
        const userId = endpoint.replace('/users/', '');
        const { data: result, error } = await this.supabase
          .from('users')
          .update(data)
          .eq('id', userId)
          .select()
          .single();
        return { success: !error, data: result, error: error?.message };
      }

      return { success: false, error: 'Endpoint not found' };
    } catch (error) {
      return { success: false, error: 'API request failed' };
    }
  }
}

// Simple State
 
// 🎯 Simple State
class SimpleState {
  private state: Record<string, any> = {};
  private listeners: Record<string, Array<(value: any) => void>> = {};
 
  get(key: string, defaultValue?: any) {
    return this.state[key] ?? defaultValue;
  }
 
  set(key: string, value: any) {
    this.state[key] = value;
    (this.listeners[key] || []).forEach(listener => listener(value));
  }
 
  subscribe(key: string, listener: (value: any) => void) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(listener);
 
    return () => {
      this.listeners[key] = this.listeners[key].filter(l => l !== listener);
    };
  }
}
 
// 🌟 Export instances
export const auth = new SimpleAuth();
export const storage = new SimpleStorage();
export const state = new SimpleState();

// 🌐 API instance that uses the singleton Supabase client
export const api = (() => {
  const apiInstance = new SimpleAPI();
  // Set the shared supabase client
  (apiInstance as any).supabase = supabaseClient;
  return apiInstance;
})();
 
// 🎯 React Hooks
import { useState, useEffect } from 'react';
 
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    // Get initial user
    auth.getCurrentUser().then(setUser);
    setLoading(false);
 
    // Listen for changes
    const { data: { subscription } } = auth.onAuthChange(setUser);
 
    return () => subscription.unsubscribe();
  }, []);
 
  return {
    user,
    loading,
    signUp: auth.signUp.bind(auth),
    signIn: auth.signIn.bind(auth),
    signOut: auth.signOut.bind(auth),
    isAuthenticated: !!user,
  };
};
 
export const useStorage = <T = any>(key: string, defaultValue?: T) => {
  const [value, setValue] = useState<T>(() => storage.get(key, defaultValue));
 
  const setStorageValue = (newValue: T) => {
    storage.set(key, newValue);
    setValue(newValue);
  };
 
  const removeValue = () => {
    storage.remove(key);
    setValue(defaultValue as T);
  };
 
  return [value, setStorageValue, removeValue] as const;
};
 
export const useGlobalState = <T = any>(key: string, defaultValue?: T) => {
  const [value, setValue] = useState<T>(() => state.get(key, defaultValue));
 
  useEffect(() => {
    setValue(state.get(key, defaultValue));
 
    const unsubscribe = state.subscribe(key, setValue);
    return unsubscribe;
  }, [key]);
 
  const setStateValue = (newValue: T) => {
    state.set(key, newValue);
    setValue(newValue);
  };
 
  return [value, setStateValue] as const;
};
 
// 🎨 Simple Utils
export const utils = {
  validateEmail: (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
 
  validatePassword: (password: string) => {
    const feedback: string[] = [];
    let strength = 0;
 
    if (password.length >= 8) strength++;
    else feedback.push('At least 8 characters');
 
    if (/[a-z]/.test(password)) strength++;
    else feedback.push('One lowercase letter');
 
    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('One uppercase letter');
 
    if (/\d/.test(password)) strength++;
    else feedback.push('One number');
 
    return { isValid: strength >= 3, strength, feedback };
  },
 
  formatDate: (date: string | Date) => {
    return new Date(date).toLocaleDateString();
  },
 
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },
 
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => {
    let timeout: number;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },
};
 
// 📝 Types
export type AuthResponse = {
  success: boolean;
  message?: string;
  error?: string;
};
 
export type APIResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};
 
export type UserProfile = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
};
 