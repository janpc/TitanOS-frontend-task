import { describe, it, expect, vi, type Mock } from 'vitest';
import moviesReducer, { fetchMoviesAsync, type MoviesState } from '../moviesSlice.ts';
import { fetchMovies } from '../../../api/movies';
import { configureStore } from '@reduxjs/toolkit';

vi.mock('../../../api/movies');

describe('moviesSlice', () => {
  const initialState: MoviesState = {
    movies: [],
    selectedIndex: 0,
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(moviesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchMoviesAsync.pending', () => {
    const action = { type: fetchMoviesAsync.pending.type };
    const state = moviesReducer(initialState, action);
    expect(state.status).toBe('loading');
  });

  it('should handle fetchMoviesAsync.fulfilled', async () => {
    const mockMovies = [{ id: 1, title: 'Test Movie', images: { artwork_portrait: 'url' } }];
    (fetchMovies as Mock).mockResolvedValue({ data: mockMovies });

    const store = configureStore({ reducer: { movies: moviesReducer } });
    await store.dispatch(fetchMoviesAsync());

    const state = store.getState().movies;
    expect(state.status).toBe('succeeded');
    expect(state.movies).toEqual(mockMovies);
  });

  it('should handle fetchMoviesAsync.rejected', async () => {
    (fetchMovies as Mock).mockRejectedValue(new Error('Failed to fetch'));

    const store = configureStore({ reducer: { movies: moviesReducer } });
    await store.dispatch(fetchMoviesAsync());

    const state = store.getState().movies;
    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch');
  });
});
