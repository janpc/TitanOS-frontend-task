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
    const { container } = renderWithProviders(<MovieList />, {
      preloadedState: {
        movies: {
          movies: [],
          selectedIndex: 0,
          status: 'loading',
          error: null,
        },
      },
    });

    expect(screen.getByText('Recommended Movies')).toBeInTheDocument();
    const skeletons = container.querySelectorAll('.movie-poster-skeleton');
    expect(skeletons).toHaveLength(6);
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
    vi.useFakeTimers();
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

    // Advance time to clear the throttle
    vi.advanceTimersByTime(201);

    // Navigate Left
    fireEvent.keyDown(secondCard, { key: 'ArrowLeft' });
    expect(document.activeElement).toBe(firstCard);
    expect(firstCard.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });

    vi.useRealTimers();
  });

  it('should handle navigation behavior: smooth for taps, auto for repeats, and throttled for both', () => {
    vi.useFakeTimers();
    const mockMovies = [
      { id: 1, title: 'Movie 1', images: { artwork_portrait: 'url1', artwork_landscape: 'url1' } },
      { id: 2, title: 'Movie 2', images: { artwork_portrait: 'url2', artwork_landscape: 'url2' } },
      { id: 3, title: 'Movie 3', images: { artwork_portrait: 'url3', artwork_landscape: 'url3' } },
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
    const thirdCard = cards[2];

    firstCard.focus();

    // 1. First tap - smooth
    fireEvent.keyDown(firstCard, { key: 'ArrowRight', repeat: false });
    expect(secondCard.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }));
    expect(document.activeElement).toBe(secondCard);

    // 2. Immediate repeat - throttled (ignored)
    vi.mocked(secondCard.scrollIntoView).mockClear();
    fireEvent.keyDown(secondCard, { key: 'ArrowRight', repeat: true });
    expect(thirdCard.scrollIntoView).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(secondCard);

    // 3. Repeat after cooldown - auto (snappy but controlled)
    vi.advanceTimersByTime(201);
    fireEvent.keyDown(secondCard, { key: 'ArrowRight', repeat: true });
    expect(thirdCard.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'auto' }));
    expect(document.activeElement).toBe(thirdCard);

    vi.useRealTimers();
  });
});
