import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [mustWatch, setMustWatch] = useState([]);
  const [watchlists, setWatchlists] = useState([]);

  const addToFavorites = (movie) => {
    if (!favorites.includes(movie.id)) setFavorites([...favorites, movie.id]);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((id) => id !== movie.id));
  };

  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      setMustWatch([...mustWatch, movie.id]);
      console.log("Added to Must Watch:", movie.id);
    }
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(mustWatch.filter((id) => id !== movie.id));
  };

  const addToWatchlist = (movie) => {
    if (!watchlists.includes(movie.id)) {
      setWatchlists([...watchlists, movie.id]);
      console.log("Added to Watchlist:", movie.id);
    }
  };

  const removeFromWatchlist = (movie) => {
    setWatchlists(watchlists.filter((id) => id !== movie.id));
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        watchlists,
        addToFavorites,
        removeFromFavorites,
        addToMustWatch,
        removeFromMustWatch,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;