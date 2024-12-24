import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/movieContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import WriteReview from "../components/cardIcons/writeReview";

const WatchlistPage = () => {
  // Access the list of movie IDs in the watchlist from context
  const { watchlists: movieIds } = useContext(MoviesContext);

  // Use React Query to fetch data for each movie in the watchlist
  const watchlistMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", { id: movieId }], // Query key with the movie ID
      queryFn: getMovie, // Fetch movie data using the getMovie function
    }))
  );

  // Check if any of the queries are still loading
  const isLoading = watchlistMovieQueries.find((m) => m.isLoading === true);

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
