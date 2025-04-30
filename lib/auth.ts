import { jwtDecode } from 'jwt-decode';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  user_type: string;
  profile_picture?: string;
  phone_number?: string;
}

export interface Session {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// Session storage keys
const ACCESS_TOKEN_KEY = 'hms_access_token';
const REFRESH_TOKEN_KEY = 'hms_refresh_token';
const USER_KEY = 'hms_user';

/**
 * Get the current session from storage
 */
export async function getSession(): Promise<Session | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const userJson = localStorage.getItem(USER_KEY);
  
  // Return null immediately if no token exists
  if (!token) {
    clearSession();
    return null;
  }
  
  // If token is expired, try to refresh if we have a valid refresh token
  if (isTokenExpired(token)) {
    // Only attempt to refresh if we have a non-expired refresh token
    if (refreshToken && !isTokenExpired(refreshToken)) {
      try {
        const newSession = await refreshTokens(refreshToken);
        return newSession;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        clearSession();
        return null;
      }
    } else {
      // If refresh token is missing or expired, clear the session
      clearSession();
      return null;
    }
  }

  // Parse user data
  let user: User | null = null;
  try {
    if (userJson) {
      user = JSON.parse(userJson);
    } else {
      // If we have a token but no user data, the session is incomplete
      clearSession();
      return null;
    }
  } catch (e) {
    console.error('Failed to parse user data:', e);
    clearSession();
    return null;
  }

  // Return the valid session
  return {
    user,
    token,
    refreshToken,
    isAuthenticated: true
  };
}

/**
 * Set session data after login
 */
export function setSession(token: string, refreshToken: string, user: User): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Clear session data on logout
 */
export function clearSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Check if a JWT token is expired
 */
function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    
    return decoded.exp < currentTime;
  } catch (e) {
    console.error('Failed to decode token:', e);
    return true;
  }
}

/**
 * Refresh access token using the refresh token
 */
async function refreshTokens(refreshToken: string): Promise<Session> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  
  const response = await fetch(`${API_URL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const { access } = await response.json();
  
  // Get user info from token
  const decoded: any = jwtDecode(access);
  const userJson = localStorage.getItem(USER_KEY);
  let user: User | null = null;
  
  try {
    if (userJson) {
      user = JSON.parse(userJson);
    }
  } catch (e) {
    console.error('Failed to parse user data:', e);
  }

  // Update session with new token
  localStorage.setItem(ACCESS_TOKEN_KEY, access);
  
  return {
    user,
    token: access,
    refreshToken,
    isAuthenticated: true,
  };
} 