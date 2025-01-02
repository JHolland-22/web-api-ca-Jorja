import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { AuthContext } from "../contexts/authContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import WriteReview from "../components/cardIcons/writeReview";

const WatchlistPage = () => {
  const context = useContext(AuthContext);

  // Ensure that context.watchlist is defined and is an array
  const watchlistMovies = Array.isArray(context.watchlist) ? context.watchlist : [];

  // Create an array of queries and run them in parallel
  const watchlistMovieQueries = useQueries(
    watchlistMovies.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  // Check if any of the parallel queries is still loading
  const isLoading = watchlistMovieQueries.some((m) => m.isLoading);

  // Show a spinner if data is still being loaded
  if (isLoading) {
    return <Spinner />;
  }

  // Map through the query responses and attach genre IDs to each movie object
  const movies = watchlistMovieQueries
    .filter((q) => q.isSuccess && q.data) // Only process successful queries with data
    .map((q) => {
      const movie = q.data;
      if (movie.genres) {
        movie.genre_ids = movie.genres.map((g) => g.id); // Map genres to genre_ids
      }
      return movie;
    });

  return (
    <PageTemplate
      title="WatchList" // Page title
      movies={movies} // List of movies to display
      action={(movie) => {
        // Action to display buttons for each movie in the watchlist
        return (
          <>
            {/* Remove button for removing the movie from the watchlist */}
            <removeFromWatchlist movie={movie} />
            {/* Button for writing a review for the movie */}
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchlistPage;
