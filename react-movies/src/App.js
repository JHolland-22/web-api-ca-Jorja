import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMovies from "./pages/UpcomingMovies";
import SiteHeader from "./components/siteHeader";
import MovieContextProvider from "./contexts/movieContext";
import ActorsContextProvider from "./contexts/actorContext";
import ActorListPage from "./pages/actorListPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WatchlistPage from "./pages/watchlistPage";
import FavoriteActorPage from "./pages/favoriteActorPage";
import TopMoviesPage from "./pages/topMoviesPage";
import AddMovieReviewPage from './pages/addMovieReviewPage'


// Create a custom theme using Material-UI's theme provider with a dark mode palette
const theme = createTheme({
  palette: {
    mode: 'dark', // Dark mode theme
  }
});

// https://mui.com/material-ui/customization/theming/
// This link refers to Material-UI's documentation for customizing the theme.

// The main App component that manages all routing and context providers
const App = () => {
  return (
    // Apply the custom theme across the app using the ThemeProvider
    <ThemeProvider theme={theme}>
      {/* BrowserRouter is the router that manages the navigation for the app */}
      <BrowserRouter>
        {/* The SiteHeader component typically displays the navigation bar */}
        <SiteHeader />
        
        {/* MovieContextProvider is the context provider that supplies movie-related data */}
        <MovieContextProvider>
          {/* ActorsContextProvider is the context provider that supplies actor-related data */}
          <ActorsContextProvider>
            {/* Routes are defined here, which map URL paths to components */}
            <Routes>
              {/* Home page route */}
              <Route path="/" element={<HomePage />} />
              
              {/* Favorite movies route */}
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              
              {/* Movie review page route, accepts dynamic id parameter */}
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              
              {/* Movie detail page route, accepts dynamic id parameter */}
              <Route path="/movies/:id" element={<MoviePage />} />
              
              {/* Upcoming movies route */}
              <Route path="/movies/upcoming" element={<UpcomingMovies />} />
              
              {/* Top-rated movies route */}
              <Route path="/movies/toprated" element={<TopMoviesPage />} />
              
              {/* Watchlist page route */}
              <Route path="/movies/watchlist" element={<WatchlistPage />} />
              
              {/* Actor list page route */}
              <Route path="/actors" element={<ActorListPage />} />
              
              {/* Actor detail page route, accepts dynamic id parameter */}
              <Route path="/actors/:id" element={<ActorDetailsPage />} />
              
              {/* Favorite actors page route */}
              <Route path="/actors/favorites" element={<FavoriteActorPage />} />
              <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />

              
              {/* Catch-all route that redirects any unknown path to the home page */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ActorsContextProvider>
        </MovieContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
