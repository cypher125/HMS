import { API_BASE_URL } from "@/lib/config";
import { apiService } from "./apiService";
import { Room } from './hostelService';
import { User } from '../auth';

interface RoomImage {
  image: string;
  is_primary: boolean;
}

export interface Hostel {
  id: number;
  name: string;
  location: string;
  description: string;
  hostel_type: string;
  image: string;
}

// Extend Room type to include hostel_name
export interface ExtendedRoom extends Room {
  hostel_name?: string;
}

export interface Application {
  id: number;
  student: number;
  room: ExtendedRoom;
  application_date: string;
  status: string;
  review_notes?: string;
  review_date?: string;
  payment_status: string;
  payment_amount?: string;
  payment_reference?: string;
  special_requests?: string;
}

export interface Payment {
  id: number;
  application: number;
  amount: string;
  reference: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  payment_method: 'Card' | 'Bank Transfer' | 'Cash';
  payment_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationCreate {
  room: number;
  special_requests?: string;
}

export interface PaymentCreate {
  amount: string;
  payment_method: 'Card' | 'Bank Transfer' | 'Cash';
}

interface ApplicationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Application[];
}

export const applicationService = {
  /**
   * Get all applications for the current user
   */
  async getMyApplications(): Promise<Application[]> {
    try {
      const response = await apiService.get<Application[]>('/applications/applications/my_applications/');
      return response.data;
    } catch (error) {
      console.error('Get my applications error:', error);
      // Return empty array instead of throwing to prevent dashboard from crashing
      return [];
    }
  },

  /**
   * Get an application by ID
   */
  async getApplicationById(id: number): Promise<Application> {
    try {
      const response = await apiService.get<Application>(`/applications/applications/${id}/`);
      return response.data;
    } catch (error: any) {
      if (error.message?.includes('404') || error.message?.includes('not found')) {
        throw new Error(`Application #${id} was not found. Please check the application ID and try again.`);
      }
      console.error(`Get application ${id} error:`, error);
      throw error;
    }
  },

  /**
   * Create a new application
   */
  async createApplication(data: {
    room: number;
    special_requests?: string;
  }): Promise<Application> {
    try {
      const response = await apiService.post<Application>('/applications/applications/', data);
      return response.data;
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  },

  /**
   * Cancel an application
   */
  async cancelApplication(id: number, reason?: string): Promise<Application> {
    try {
      const response = await apiService.patch<Application>(`/applications/applications/${id}/cancel/`, {
        reason: reason
      });
      return response.data;
    } catch (error) {
      console.error(`Error canceling application with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get all payments for the current user
   */
  async getMyPayments(): Promise<Payment[]> {
    try {
      const response = await apiService.get<Payment[]>('/applications/applications/my_payments/');
      return response.data;
    } catch (error) {
      console.error('Get my payments error:', error);
      // Return empty array instead of throwing to prevent dashboard from crashing
      return [];
    }
  },

  /**
   * Create a new payment for an application
   */
  async createPayment(applicationId: number, data: PaymentCreate): Promise<Payment> {
    try {
      // Generate a unique reference number
      const reference = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const response = await apiService.post<Payment>(`/applications/applications/${applicationId}/payments/`, {
        amount: data.amount,
        payment_method: data.payment_method,
        reference: reference
      });
      return response.data;
    } catch (error) {
      console.error(`Create payment for application ${applicationId} error:`, error);
      throw error;
    }
  },

  async getApplications(page = 1, pageSize = 10): Promise<ApplicationListResponse> {
    try {
      const response = await apiService.get<ApplicationListResponse>('/applications/applications/', {
        params: { page, page_size: pageSize }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  },

  async getStudentApplications(page = 1, pageSize = 10): Promise<ApplicationListResponse> {
    const response = await apiService.get<ApplicationListResponse>('/applications/applications/student/', {
      params: { page, page_size: pageSize }
    });
    return response.data;
  },

  async makePayment(id: number): Promise<Application> {
    try {
      const response = await apiService.patch<Application>(`/applications/applications/${id}/`, {
        payment_status: 'Paid'
      });
      return response.data;
    } catch (error) {
      console.error(`Error making payment for application with id ${id}:`, error);
      throw error;
    }
  },

  /**
   * Get payments for a specific application
   */
  async getPaymentsByApplicationId(id: number): Promise<Payment[]> {
    try {
      const response = await apiService.get<Payment[]>(`/applications/applications/${id}/payments/`);
      return response.data;
    } catch (error) {
      console.error(`Error getting payments for application ${id}:`, error);
      // Return empty array instead of throwing to prevent UI components from crashing
      return [];
    }
  }
};