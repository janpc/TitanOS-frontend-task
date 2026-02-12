import React, { useState } from 'react';
import { type Movie } from '../../api/types';
import clsx from 'clsx';

interface MovieListItemProps {
  movie?: Movie;
  loading?: boolean;
}

const MovieListItem: React.FC<MovieListItemProps> = ({ movie, loading }) => {
  const [isImageReady, setIsImageReady] = useState(false);

  if (loading) {
    return (
      <div className="movie-card loading" aria-hidden="true">
        <div className="movie-poster-skeleton" />
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div 
      className="movie-card" 
      tabIndex={0}
      role="button"
      aria-label={movie.title}
    >
      <img
        className={clsx("movie-poster", { "movie-poster-skeleton": !isImageReady })}
        src={movie.images.artwork_portrait}
        alt={movie.title}
        loading="lazy"
        onLoad={() => setIsImageReady(true)}
      />
      <div className="movie-info">
        <p className="movie-title">{movie.title}</p>
      </div>
    </div>
  );
};

export default MovieListItem;
