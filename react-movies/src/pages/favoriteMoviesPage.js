import React, {useContext} from "react";
import PageTemplate from "../components/templateMovieListPage";
import {MoviesContext} from "../contexts/movieContext";
import {useQueries} from "react-query";
import {getMovie} from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReviewIcon from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
    const {favorites: movieIds } = useContext(MoviesContext);

    const favoriteMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );
    const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

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