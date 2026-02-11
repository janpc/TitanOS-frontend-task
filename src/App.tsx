import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchMoviesAsync } from './features/movies/moviesSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const { movies, status, error } = useAppSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMoviesAsync());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>TitanOS Frontend Task</h1>
      <div style={{ display: 'flex', overflowX: 'auto', gap: '10px' }}>
        {movies?.map((movie) => (
          <div key={movie.id} style={{ minWidth: '200px' }}>
            <img
              src={movie.images.artwork_portrait}
              alt={movie.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
