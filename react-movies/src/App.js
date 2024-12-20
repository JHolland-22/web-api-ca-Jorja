import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMovies from "./pages/UpcomingMovies";
import SiteHeader from "./components/siteHeader";
import MovieContextProvider from "./contexts/movieContext";
import ActorsContextProvider from "./contexts/actorContext";
import AuthContextProvider from "./contexts/authContext";
import ActorListPage from "./pages/actorListPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WatchlistPage from "./pages/watchlistPage";
import FavoriteActorPage from "./pages/favoriteActorPage";
import TopMoviesPage from "./pages/topMoviesPage";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import ProtectedRoutes from './protectedRoutes';
import ProfilePage from "./pages/profilePage";
import SignUpPage from "./pages/signUpPage";
import LoginPage from "./pages/loginPage";

const theme = createTheme({
  palette: {
    mode: 'dark',
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader />
          <MovieContextProvider>
            <ActorsContextProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                  <Route path="/reviews/:id" element={<MovieReviewPage />} />
                  <Route path="/movies/:id" element={<MoviePage />} />
                  <Route path="/movies/upcoming" element={<UpcomingMovies />} />
                  <Route path="/movies/toprated" element={<TopMoviesPage />} />
                  <Route path="/movies/watchlist" element={<WatchlistPage />} />
                  <Route path="/actors" element={<ActorListPage />} />
                  <Route path="/actors/:id" element={<ActorDetailsPage />} />
                  <Route path="/actors/favorites" element={<FavoriteActorPage />} />
                  <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </ActorsContextProvider>
          </MovieContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
