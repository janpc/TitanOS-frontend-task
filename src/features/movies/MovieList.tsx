import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/hooks';
import MovieListItem from './MovieListItem';
import './MovieList.css';

const MovieList: React.FC = () => {
  const { movies, status, error } = useAppSelector((state) => state.movies);
  const containerRef = useRef<HTMLDivElement>(null);
  const isThrottledRef = useRef(false);

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
        <h2 className="movie-list-title">Recommended Movies</h2>
        <div className="movie-list-scroll">
          {[...Array(6)].map((_, i) => (
            <MovieListItem key={`skeleton-${i}`} loading />
          ))}
        </div>
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
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

    const target = e.target as HTMLElement;
    
    const performMove = () => {
      const nextElement = (e.key === 'ArrowRight' 
        ? target.nextElementSibling 
        : target.previousElementSibling) as HTMLElement;

      if (nextElement) {
        e.preventDefault();
        nextElement.focus({ preventScroll: true });
        nextElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    };

    if (isThrottledRef.current) {
      e.preventDefault();
      return;
    }

    performMove();

    if (e.repeat) {
      isThrottledRef.current = true;
      setTimeout(() => {
        isThrottledRef.current = false;
      }, 400)
    }
  };

  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">Recommended Movies</h2>
      <div 
        className="movie-list-scroll" 
        ref={containerRef}
        onKeyDown={handleKeyDown}
      >
        {movies?.map((movie) => (
          <MovieListItem 
            key={movie.id} 
            movie={movie} 
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
