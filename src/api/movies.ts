import axios from 'axios';
import type { ApiResponse } from './types';

const API_URL = 'https://eu.acc01.titanos.tv/v1/genres/1/contents?market=es&device=tv&locale=es&page=1&per_page=50&type=movie';

export const fetchMovies = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(API_URL);
  return response.data;
};
