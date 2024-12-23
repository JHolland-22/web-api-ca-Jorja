import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
  try {
    const response = await fetch('http://localhost:8080/tmdb/upcoming');
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming from the backend');
    }
    const upcoming = await response.json();
    return upcoming;
  } catch (error) {
    console.error('Error fetching upcoming:', error);
    throw error;
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
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
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
    `http://localhost:8080/api/movies/${id}`
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }
    return response.json();
  }).catch((error) => {
    throw error;
  });
};

export const getTopMovies = async () => {
  try {
    const response = await fetch('http://localhost:8080/tmdb/toprated');
    if (!response.ok) {
      throw new Error('Failed to fetch upcoming from the backend');
    }
    const toprated = await response.json();
    return toprated;
  } catch (error) {
    console.error('Error fetching upcoming:', error);
    throw error;
  }
};