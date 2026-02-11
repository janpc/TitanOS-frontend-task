import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Movie } from '../../api/types';
import { fetchMovies } from '../../api/movies';

export interface MoviesState {
  movies: Movie[];
  selectedIndex: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  selectedIndex: 0,
  status: 'idle',
  error: null,
};

export const fetchMoviesAsync = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await fetchMovies();
    return response;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload.collection;
      })
      .addCase(fetchMoviesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export default moviesSlice.reducer;
