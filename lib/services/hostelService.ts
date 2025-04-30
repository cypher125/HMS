import { apiService } from './apiService';

export interface Hostel {
  id: number;
  name: string;
  description: string;
  location: string;
  gender: string;
  capacity: number;
  image: string | null;
  warden_name: string;
  warden_phone: string;
  warden_email: string;
  facilities: string;
  created_at: string;
  updated_at: string;
  available_rooms: number;
  total_rooms: number;
  images: HostelImage[];
  rooms?: Room[];
}

export interface HostelImage {
  id: number;
  hostel: number;
  image: string;
  is_primary: boolean;
}

export interface Room {
  id: number;
  hostel: number;
  room_number: string;
  floor: string;
  room_type: string;
  capacity: number;
  is_available: boolean;
  price: string;
  description: string;
  facilities: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  available_beds: number;
  is_full: boolean;
  images: RoomImage[];
}

export interface RoomImage {
  id: number;
  room: number;
  image: string;
  is_primary: boolean;
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export const hostelService = {
  /**
   * Get all hostels
   */
  async getHostels(filters?: Record<string, string>): Promise<Hostel[]> {
    try {
      let endpoint = '/hostels/hostels/';
      
      // Add query params if filters are provided
      const params: Record<string, string> = {};
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params[key] = value;
          }
        });
      }
      
      const response = await apiService.get<Hostel[]>(endpoint, { params });
      return response.data.results || response.data;
    } catch (error) {
      console.error('Get hostels error:', error);
      throw error;
    }
  },

  /**
   * Get hostel details by ID
   */
  async getHostelById(id: number): Promise<Hostel> {
    try {
      const response = await apiService.get<Hostel>(`/hostels/hostels/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Get hostel ${id} error:`, error);
      throw error;
    }
  },

  /**
   * Get all rooms
   */
  async getRooms(filters?: Record<string, string>): Promise<Room[]> {
    try {
      let endpoint = '/hostels/rooms/';
      
      // Add query params if filters are provided
      const params: Record<string, string> = {};
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            params[key] = value;
          }
        });
      }
      
      const response = await apiService.get<Room[]>(endpoint, { params });
      return response.data.results || response.data;
    } catch (error) {
      console.error('Get rooms error:', error);
      throw error;
    }
  },

  /**
   * Get room details by ID
   */
  async getRoomById(id: number): Promise<Room> {
    try {
      const response = await apiService.get<Room>(`/hostels/rooms/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Get room ${id} error:`, error);
      throw error;
    }
  },

  /**
   * Get all amenities
   */
  async getAmenities(): Promise<Amenity[]> {
    try {
      const response = await apiService.get<Amenity[]>('/hostels/amenities/');
      return response.data.results || response.data;
    } catch (error) {
      console.error('Get amenities error:', error);
      throw error;
    }
  }
}; 