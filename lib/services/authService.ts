import { apiService } from './apiService';
import { setSession, clearSession, User } from '../auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  user_type: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  student?: {
    matric_number: string;
    department: string;
    level: string;
  };
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export const authService = {
  /**
   * Login a user
   */
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { email, password } = credentials;
      
      // Get JWT tokens
      const tokenResponse = await apiService.post<{ access: string; refresh: string }>('/token/', { 
        email, 
        password 
      });
      
      const { access, refresh } = tokenResponse.data;
      
      // Get user info
      const userResponse = await apiService.get<User>('/accounts/users/me/', {
        headers: {
          'Authorization': `Bearer ${access}`
        }
      });
      
      const user = userResponse.data;
      
      // Save session
      setSession(access, refresh, user);
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<User> {
    try {
      const response = await apiService.post<User>('/accounts/register/', data);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Logout the current user
   */
  logout(): void {
    clearSession();
    // Redirect to login page will be handled by the component
  },

  /**
   * Get the current user profile
   */
  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiService.get<User>('/accounts/users/me/');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  /**
   * Get student profile if the user is a student
   */
  async getStudentProfile(): Promise<any> {
    try {
      const response = await apiService.get<any>('/accounts/students/my_profile/');
      return response.data;
    } catch (error) {
      console.error('Get student profile error:', error);
      // Return null instead of throwing to prevent dashboard from crashing
      return null;
    }
  }
}; 