import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './auth';

export async function middleware(request: NextRequest) {
  // Get session and clone URL for potential redirects
  const session = await getSession();
  const url = request.nextUrl.clone();
  
  // Define protected routes that require authentication
  const protectedRoutes = [
    '/student/dashboard',
    '/student/applications',
    '/student/profile'
  ];
  
  // Check if the current path matches any protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  // If it's a protected route but no valid session exists, redirect to login
  if (isProtectedRoute && (!session || !session.token || !session.isAuthenticated)) {
    url.pathname = '/auth/login';
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  // Only check for applications if we're accessing the dashboard and have a valid session
  if (request.nextUrl.pathname.startsWith('/student/dashboard') && session && session.token) {
    try {
      // Try to fetch the applications
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const response = await fetch(`${API_URL}/applications/applications/my_applications/`, {
        headers: {
          'Authorization': `Bearer ${session.token}`
        }
      });
      
      // If there's an error or no applications, redirect to the no-application page
      if (!response.ok) {
        url.pathname = '/student/no-application';
        return NextResponse.redirect(url);
      }
      
      // Check if there are any applications
      const applications = await response.json();
      if (!applications || applications.length === 0) {
        url.pathname = '/student/no-application';
        return NextResponse.redirect(url);
      }
      
    } catch (error) {
      console.error('Failed to check applications:', error);
      url.pathname = '/student/no-application';
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/student/:path*',
  ]
}; 