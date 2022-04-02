export interface ApiResponse<T> {
  message?: string;
  missingParams?: [];
  data: T | { count?: number};
}
