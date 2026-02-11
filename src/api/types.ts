export interface MovieImage {
  artwork_landscape: string;
  artwork_portrait: string;
}

export interface Movie {
  id: number;
  title: string;
  images: MovieImage;
}

export interface Pagination {
  current_page: number;
  total_count: number;
  total_pages: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface ApiResponse {
  collection: Movie[];
  pagination: Pagination;
}
