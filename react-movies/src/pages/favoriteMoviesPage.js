import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { AuthContext } from "../contexts/authContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReviewIcon from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
    const context = useContext(AuthContext);

    // Ensure that context.favourites is defined and is an array
    const favouriteMovies = Array.isArray(context.favourites) ? context.favourites : [];

    // Create an array of queries and run them in parallel
    const favoriteMovieQueries = useQueries(
        favouriteMovies.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );

    // Check if any query is loading
    const isLoading = favoriteMovieQueries.some((query) => query.isLoading);

    if (isLoading) {
        return <Spinner />;
    }

    const movies = favoriteMovieQueries
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
            title="Favorite Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <RemoveFromFavorites movie={movie} />
                        <WriteReviewIcon movie={movie} />
                    </>
                );
            }}
        />
    );
};

export default FavoriteMoviesPage;
