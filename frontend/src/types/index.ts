export interface Rack {
  id: number;
  tag: string;
  name: string;
  location: string | null;
  capacity: number;
  created_at: string;
  updated_at: string;
}

export interface Equipment {
  id: number;
  tag: string;
  name: string;
  type: string | null;
  status?: string ;
  model?: string | null;
  serial_number?: string | null;
  height?: number | null;
  rack_id: number | null;
  rack_tag: string | null;
  slot_position: number | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: PaginationMeta;
  errors?: Array<{ field?: string; message: string }>;
}