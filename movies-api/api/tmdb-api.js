import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch upcoming movies');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;  // Rethrow to propagate error to your route handler
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch genres');
    }

    const data = await response.json();
    return data.genres;  // Only return the genres part
  } catch (error) {
    throw error;  // Rethrow to propagate error to your route handler
  }
};
