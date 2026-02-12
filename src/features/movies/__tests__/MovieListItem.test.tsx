import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieListItem from '../MovieListItem';
import { type Movie } from '../../../api/types';

describe('MovieListItem Component', () => {
  const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie',
    images: {
      artwork_portrait: 'portrait.jpg',
      artwork_landscape: 'landscape.jpg',
    },
  };

  it('renders movie details correctly', () => {
    render(<MovieListItem movie={mockMovie} onKeyDown={() => {}} />);
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    const img = screen.getByAltText('Test Movie') as HTMLImageElement;
    expect(img.src).toContain('portrait.jpg');
  });

  it('calls onKeyDown when a key is pressed', () => {
    const handleKeyDown = vi.fn();
    render(<MovieListItem movie={mockMovie} onKeyDown={handleKeyDown} />);
    
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'ArrowRight' });
    
    expect(handleKeyDown).toHaveBeenCalledTimes(1);
  });

  it('has correct accessibility attributes', () => {
    render(<MovieListItem movie={mockMovie} onKeyDown={() => {}} />);
    
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
    expect(card).toHaveAttribute('aria-label', 'Test Movie');
  });
});
