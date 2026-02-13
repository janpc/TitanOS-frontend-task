export interface MovieImage {
  artwork_landscape: string;
  artwork_portrait: string;
}

export interface Movie {
  id: number;
  title: string;
  images: MovieImage;
}

export interface ApiResponse {
  collection: Movie[];
}
