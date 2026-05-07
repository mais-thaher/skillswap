// src/utils/auth-debug.ts
// Utility to debug Supabase auth session storage
 
export const debugAuthSession = () => {
  console.group('🔍 Supabase Auth Debug');
 
  // Check localStorage
  const supabaseAuth = localStorage.getItem('supabase.auth.token');
  if (supabaseAuth) {
    const parsed = JSON.parse(supabaseAuth);
    console.log('✅ Session found in localStorage:', {
      hasAccessToken: !!parsed.access_token,
      hasRefreshToken: !!parsed.refresh_token,
      hasUser: !!parsed.user,
      expiresAt: new Date(parsed.expires_at * 1000).toLocaleString(),
      userEmail: parsed.user?.email,
    });
  } else {
    console.log('❌ No session found in localStorage');
  }
 
  // Check all localStorage items
  console.log('📦 All localStorage items:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.includes('supabase')) {
      console.log(`  ${key}:`, localStorage.getItem(key));
    }
  }
 
  console.groupEnd();
};
 
export const clearAuthSession = () => {
  console.log('🗑️ Clearing auth session...');
  localStorage.removeItem('supabase.auth.token');
  console.log('✅ Session cleared');
};
 