export const getMovies = async (args) => {
  const [, idPart] = args;
  const { page } = idPart;

  try {
    const response = await fetch(
      `http://localhost:8080/api/movies?page=${page}`, {
        headers: {
          'Authorization': window.localStorage.getItem('token')
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return {
      results: data.results || [],
      total_pages: data.total_pages || 1,
    };

  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};



export const getMovie = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  try {
    const response = await fetch(
      `http://localhost:8080/api/movies/${id}`, {
        headers: {
          'Authorization': window.localStorage.getItem('token')
        }
      }
    );
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const getGenres = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/genres", {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch genres from backend');
    }

    const data = await response.json();
    return data.genres || []; // return genres list
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};


export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};


export const getMovieReviews = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    );
    const data = await response.json();
    if (response.ok) {
      return data.results || [];
    }
    throw new Error(data.status_message || "Something went wrong");
  } catch (error) {
    throw error;
  }
};

export const getUpcomingMovies = async (args) => {
  const [, idPart] = args;
  const { page } = idPart;

  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/upcoming?page=${page}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch upcoming movies');
    }

    const data = await response.json();
    return {
      results: data.results || [],
      total_pages: data.total_pages || 1,
    };

  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};


export const getActors = async (args) => {
  if (!Array.isArray(args) || args.length < 2 || typeof args[1] !== 'object') {
    throw new Error('Invalid arguments passed to getActors');
  }
  
  const { page = 1 } = args[1];
  
  try {
    const response = await fetch(`http://localhost:8080/api/movies/tmdb/actors?page=${page}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token'),
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch actors');
    }

    const data = await response.json();
    return {
      results: data.results || [],
      total_pages: data.total_pages || 1,
    };

  } catch (error) {
    console.error('Error fetching actors:', error);
    throw error;
  }
};


export const getActor = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;

  try {
    const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/actors/${id}`, {
        headers: {
          'Authorization': window.localStorage.getItem('token'),
        }
      }
    );
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};



export const getActorImages = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};





export const getMovieCredits = (movieId) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getActorMovies = (actorId) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const getTopMovies = (page = 1) => {
  return fetch(
    `http://localhost:8080/api/movies/tmdb/toprated?page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

export const searchActorsByName = (name) => {
  return fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${name}`
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.status_message || "Something went wrong");
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  return data;
};

export const signup = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  return data;
};

export const getUserDetails = async (username) => {
  const response = await fetch(`http://localhost:8080/api/userDetails/${username}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  });
  return response.json();
}

export const addMovie = async (username, movieid, listName) => {
  const response = await fetch(`http://localhost:8080/api/userDetails/${username}/add`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ id: movieid, array: listName  })
  });
  return response.json();
};

export const removeMovie = async (username, movieid, listName) => {
  const response = await fetch(`http://localhost:8080/api/userDetails/${username}/rem`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'put',
    body: JSON.stringify({ id: movieid, array: listName})
  });
  return response.json()
};
