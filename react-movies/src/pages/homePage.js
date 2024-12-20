import React, { useState, useEffect } from "react";
import { getMovies, getGenres } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";

const HomePage = () => {
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery(
    ["discover", page],
    () => getMovies(["discover", page]),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    getGenres().then((response) => {
      if (Array.isArray(response)) {
        setGenres(response);
      }
    });
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 1;

  const getMovieGenres = (movie) => {
    if (!genres || genres.length === 0 || !movie.genre_ids) {
      return [];
    }
    return movie.genre_ids
      .map((genreId) => genres.find((genre) => genre.id === genreId))
      .filter((genre) => genre);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
        getGenresForMovie={getMovieGenres}
      />
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      />
    </>
  );
};


export default HomePage;
