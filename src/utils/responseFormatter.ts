interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function formatResponse<T>(
  success: boolean,
  message: string,
  data: T | null = null,
  pagination?: Pagination
) {
  return {
    success,
    message,
    data,
    ...(pagination ? { pagination } : {}) // only include if exists
  };
}
