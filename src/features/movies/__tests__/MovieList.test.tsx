import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import MovieList from '../MovieList';
import { renderWithProviders } from '../../../test/test-utils';

// Mock scrollIntoView as it's not available in the test environment
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('MovieList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    renderWithProviders(<MovieList />, {
      preloadedState: {
        movies: {
          movies: [],
          selectedIndex: 0,
          status: 'loading',
          error: null,
        },
      },
    });

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    const errorMessage = 'Failed to fetch movies';
    renderWithProviders(<MovieList />, {
      preloadedState: {
        movies: {
          movies: [],
          selectedIndex: 0,
          status: 'failed',
          error: errorMessage,
        },
      },
    });

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should render a list of movies', () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', images: { artwork_portrait: 'url1', artwork_landscape: 'url1' } },
      { id: 2, title: 'Movie 2', images: { artwork_portrait: 'url2', artwork_landscape: 'url2' } },
    ];

    renderWithProviders(<MovieList />, {
      preloadedState: {
        movies: {
          movies: mockMovies,
          selectedIndex: 0,
          status: 'succeeded',
          error: null,
        },
      },
    });

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('should auto-focus the first movie on mount when succeeded', () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', images: { artwork_portrait: 'url1', artwork_landscape: 'url1' } },
      { id: 2, title: 'Movie 2', images: { artwork_portrait: 'url2', artwork_landscape: 'url2' } },
    ];

    renderWithProviders(<MovieList />, {
      preloadedState: {
        movies: {
          movies: mockMovies,
          selectedIndex: 0,
          status: 'succeeded',
          error: null,
        },
      },
    });

    const cards = screen.getAllByRole('button');
    expect(document.activeElement).toBe(cards[0]);
  });

  it('should handle arrow key navigation', () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', images: { artwork_portrait: 'url1', artwork_landscape: 'url1' } },
      { id: 2, title: 'Movie 2', images: { artwork_portrait: 'url2', artwork_landscape: 'url2' } },
    ];

    renderWithProviders(<MovieList />, {
      preloadedState: {
        movies: {
          movies: mockMovies,
          selectedIndex: 0,
          status: 'succeeded',
          error: null,
        },
      },
    });

    const cards = screen.getAllByRole('button');
    const firstCard = cards[0];
    const secondCard = cards[1];

    firstCard.focus();
    expect(document.activeElement).toBe(firstCard);

    // Navigate Right
    fireEvent.keyDown(firstCard, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(secondCard);
    expect(secondCard.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });

    // Navigate Left
    fireEvent.keyDown(secondCard, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(firstCard);
    expect(firstCard.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  });
});
