import React from 'react';
import { type Movie } from '../../api/types';

interface MovieListItemProps {
  movie: Movie;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie, onKeyDown }) => {
  return (
    <div 
      className="movie-card" 
      tabIndex={0}
      role="button"
      aria-label={movie.title}
      onKeyDown={onKeyDown}
    >
      <img
        className="movie-poster"
        src={movie.images.artwork_portrait}
        alt={movie.title}
        loading="lazy"
      />
      <div className="movie-info">
        <p className="movie-title">{movie.title}</p>
      </div>
    </div>
  );
};

export default MovieListItem;
