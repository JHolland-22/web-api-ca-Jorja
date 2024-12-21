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
    const response = await fetch('http://localhost:8080/tmdb/genres');
    if (!response.ok) {
      throw new Error('Failed to fetch genres from the backend');
    }
    const genres = await response.json();
    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};



export const getMovies = (args) => {
  const [, idPart] = args.queryKey;
  const { page } = idPart;

  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  }).catch((error) => {
     throw error
  });
};

  
export const getMovie = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};


