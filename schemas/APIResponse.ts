export default interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  count: number;
}
