export interface PaginationParams {
    page: number;
    limit: number;
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
export interface PaginatedResult<T> {
    data: T;
    pagination: PaginationMeta;
}