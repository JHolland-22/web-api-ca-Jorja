import React, { useState, createContext } from "react";
import { login, getUserDetails,removeMovie,addMovie,signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [loginErr, setLoginErr] = useState(null);
  const [authErr, setAuthErr] = useState(null);
  const [favourites, setFavourites] = useState();
  const [watchlist, setWatchlist] = useState();

  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  };

  const authenticate = async (username, password) => {
    const result = await login(username, password);
    if (result.token) {
      setToken(result.token);
      setIsAuthenticated(true);
      setUserName(username);
      const userDetails = await getUserDetails(username);
      setFavourites(userDetails.favourites);
      setWatchlist(userDetails.watchlist);
    } else {
      setLoginErr(result.msg);
    }
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    if (!result.success) {
      setAuthErr(result.msg);
      return false;
    }
    if (result.code === 201) {
      return true;
    }
  };

  const signout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    setUserName("");
    localStorage.removeItem("token");
  };

    const addToFavourites = async (movieid) => {
    const response = await addMovie(userName, movieid, "favourites");
    console.log(response);
    setFavourites(prev => [...favourites, movieid]);
    return (response.code === 200) ? true : false;
  }

  const removeFromFavourites = async (movieid) => {
    const response = await removeMovie(userName, movieid, "favourites");
    console.log(response);
    setFavourites(prev => prev.filter(id => id !== movieid));
    return (response.code === 200) ? true : false;
  }

  const addToWatchlist = async (movieid) => {
    const response = await addMovie(userName, movieid, "watchlist");
    console.log(response);
    setWatchlist(prev => [...watchlist, movieid]);
    return (response.code === 200) ? true : false;
  }

  const removeFromWatchlist = async (movieid) => {
    const response = await removeMovie(userName, movieid, "watchlist");
    console.log(response);
    setWatchlist(prev => prev.filter(id => id !== movieid));
    return (response.code === 200) ? true : false;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        signout,
        userName,
        authErr,
        loginErr,
        authToken,
        addToFavourites,
        removeFromFavourites,
        addToWatchlist,
        removeFromWatchlist,
        favourites,
        watchlist
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;