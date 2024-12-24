import React, { useState, createContext } from "react";
import { login, signup } from "../api/tmdb-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);
  const [authToken, setAuthToken] = useState(existingToken);
  const [userName, setUserName] = useState("");
  const [loginErr, setLoginErr] = useState(null);
  const [authErr, setAuthErr] = useState(null);

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
        authToken
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;