import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { fetchMoviesAsync } from './features/movies/moviesSlice';
import MovieList from './features/movies/MovieList';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMoviesAsync());
  }, [dispatch]);

  return (
    <div className="app-container" style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <header style={{ padding: '40px 40px 20px' }}>
        <h1 style={{ color: '#fff', margin: 0, fontFamily: 'Inter, sans-serif' }}>
          TitanOS TV
        </h1>
      </header>
      <main>
        <MovieList />
      </main>
    </div>
  );
};

export default App;
