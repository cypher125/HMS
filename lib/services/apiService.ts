"use client";

import { getSession } from '../auth';

// Define the API_BASE_URL directly instead of importing
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface RequestOptions {
  params?: Record<string, any>;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export const apiService = {
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return await request<T>(endpoint, 'GET', undefined, options);
  },

  async post<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return await request<T>(endpoint, 'POST', data, options);
  },

  async put<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return await request<T>(endpoint, 'PUT', data, options);
  },

  async patch<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return await request<T>(endpoint, 'PATCH', data, options);
  },

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return await request<T>(endpoint, 'DELETE', undefined, options);
  }
};

async function request<T>(
  endpoint: string, 
  method: string, 
  data?: any, 
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const session = await getSession();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (session?.token) {
    headers['Authorization'] = `Bearer ${session.token}`;
  }

  const queryParams = options.params 
    ? `?${new URLSearchParams(Object.entries(options.params)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
      ).toString()}`
    : '';

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    // Check if the server is available first
    const response = await fetch(`${url}${queryParams}`, config);
    
    // Try to parse the response JSON if possible
    let responseData;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      try {
        responseData = await response.json();
      } catch (e) {
        console.error('Error parsing JSON response:', e);
        throw new Error('Invalid JSON response from server');
      }
    } else {
      // Handle non-JSON responses
      const textResponse = await response.text();
      
      // Check if it's HTML that might be a Django debug page or a 5xx error
      if (textResponse.includes('<!DOCTYPE html>') || textResponse.includes('<html>')) {
        console.warn('Received HTML response instead of JSON:', textResponse.substring(0, 200));
        
        // Extract error message if present
        let errorMessage = 'Server did not return JSON data';
        
        // Look for error title if it appears to be a Django error page
        if (textResponse.includes('<title>')) {
          const titleMatch = textResponse.match(/<title>(.*?)<\/title>/);
          if (titleMatch && titleMatch[1]) {
            errorMessage = `Server error: ${titleMatch[1]}`;
          }
        }
        
        responseData = { detail: errorMessage };
      } else if (textResponse.trim()) {
        console.warn('Received non-JSON response:', textResponse.substring(0, 100));
        responseData = { detail: 'Server did not return JSON data' };
      } else {
        responseData = { detail: 'Server returned an empty response' };
      }
      
      if (!response.ok) {
        throw new Error(responseData.detail);
      }
    }
    
    // Handle error responses
    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        console.error('Authentication error:', responseData);
        // Clear session on authentication errors
        if (typeof window !== 'undefined') {
          localStorage.removeItem('hms_access_token');
          localStorage.removeItem('hms_refresh_token');
          localStorage.removeItem('hms_user');
        }
        
        throw new Error('Authentication failed. Please log in again.');
      }
      
      // Handle server errors (5xx)
      if (response.status >= 500) {
        console.error('Server error:', responseData);
        throw new Error('Server error. Please try again later.');
      }
      
      // Handle validation errors (400 status)
      if (response.status === 400) {
        console.error('Validation error:', responseData);
        
        // Try to extract a meaningful error message
        const errorMessage = responseData.detail || 
                            responseData.non_field_errors?.[0] ||
                            Object.values(responseData)[0]?.[0] ||
                            'Invalid request data';
        
        throw new Error(errorMessage);
      }

      // Handle not found errors (404 status)
      if (response.status === 404) {
        console.error('Not found error:', responseData);
        throw new Error('Resource not found. Please check your connection and try again.');
      }
      
      // Handle other errors
      throw new Error(responseData.detail || `Error ${response.status}: ${response.statusText}`);
    }
    
    return {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    // Handle network errors and other exceptions
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error:', error);
      throw new Error('Network error: Could not connect to the server. Please check your connection and try again.');
    }
    
    console.error('API request error:', error);
    throw error;
  }
} 