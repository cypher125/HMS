import { getSession } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Base API client for making requests to the backend
 */
export const api = {
  /**
   * Make a GET request to the API
   */
  async get(endpoint: string) {
    return await request(endpoint, 'GET');
  },

  /**
   * Make a POST request to the API
   */
  async post(endpoint: string, data: any) {
    return await request(endpoint, 'POST', data);
  },

  /**
   * Make a PUT request to the API
   */
  async put(endpoint: string, data: any) {
    return await request(endpoint, 'PUT', data);
  },

  /**
   * Make a PATCH request to the API
   */
  async patch(endpoint: string, data: any) {
    return await request(endpoint, 'PATCH', data);
  },

  /**
   * Make a DELETE request to the API
   */
  async delete(endpoint: string) {
    return await request(endpoint, 'DELETE');
  }
};

/**
 * Generic request function for making API calls
 */
async function request(endpoint: string, method: string, data?: any): Promise<any> {
  const url = `${API_URL}/${endpoint}`;
  const session = await getSession();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (session?.token) {
    headers['Authorization'] = `Bearer ${session.token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    
    // Handle token expiration
    if (response.status === 401) {
      // If we have a refresh token, we could try to refresh the access token here
      // For now, just throw an error
      throw new Error('Unauthorized');
    }
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.detail || 'An error occurred');
    }
    
    return responseData;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
} 