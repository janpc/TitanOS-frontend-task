import { describe, it, expect, vi, type Mock } from 'vitest';
import { fetchMovies } from '../movies.ts';
import axios from 'axios';

vi.mock('axios');

describe('fetchMovies API', () => {
  it('should fetch movies successfully', async () => {
    const mockData = {
      data: {
        collection: [
          {
            id: 1,
            title: 'Test Movie',
            images: { artwork_portrait: 'url', artwork_landscape: 'url' },
          },
        ],
        pagination: {
          current_page: 1,
          total_count: 1,
          total_pages: 1,
          next_page: null,
          prev_page: null,
        },
      },
    };

    (axios.get as Mock).mockResolvedValue(mockData);

    const result = await fetchMovies();

    expect(axios.get).toHaveBeenCalledWith(
      'https://eu.acc01.titanos.tv/v1/genres/1/contents?market=es&device=tv&locale=es&page=1&per_page=50&type=movie'
    );
    expect(result).toEqual(mockData.data);
  });

  it('should throw an error on failure', async () => {
    (axios.get as Mock).mockRejectedValue(new Error('Network Error'));

    await expect(fetchMovies()).rejects.toThrow('Network Error');
  });
});
