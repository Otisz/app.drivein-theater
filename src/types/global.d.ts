declare type ApiResponse<T> = {
  message: string | null;
  payload: T;
};

declare type ApiValidationResponse<T> = {
  message: string;
  errors: Record<keyof Omit<T, "id" | "createdAt" | "updatedAt">, string[] | undefined>;
};

declare type ApiPaginationResponse<T> = {
  links: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
  message: string | null;
  meta: PaginationMeta;
  payload: T[];
};

declare type PaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: Array<{ active: boolean; label: string; url: string | null }>;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};
