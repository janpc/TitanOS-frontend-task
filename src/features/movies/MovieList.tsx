import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/hooks';
import MovieListItem from './MovieListItem';
import './MovieList.css';

const MovieList: React.FC = () => {
  const { movies, status, error } = useAppSelector((state) => state.movies);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'succeeded' && containerRef.current) {
      const firstCard = containerRef.current.querySelector('.movie-card') as HTMLElement;
      if (firstCard) {
        firstCard.focus();
      }
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="movie-list-container">
        <h2 className="movie-list-title">Recommended Movies: loading...</h2>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="movie-list-container">
        <div style={{ color: '#ff4444', padding: '40px' }}>Error: {error}</div>
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = target.nextElementSibling as HTMLElement;
      if (next) {
        next.focus();
        next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = target.previousElementSibling as HTMLElement;
      if (prev) {
        prev.focus();
        prev.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">Recommended Movies</h2>
      <div className="movie-list-scroll" ref={containerRef}>
        {movies?.map((movie) => (
          <MovieListItem 
            key={movie.id} 
            movie={movie} 
            onKeyDown={handleKeyDown} 
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
