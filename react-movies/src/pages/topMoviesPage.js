import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { getTopMovies, getGenres } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "../contexts/movieContext";
import Pagination from "@mui/material/Pagination";

const TopMoviesPage = () => {
  // State for storing genres and current page
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  
  // Access the function to add movies to 'must watch' list from context
  const { addToMustWatch } = useContext(MoviesContext);

  // Fetch the top-rated movies for the current page using React Query
  const { data, error, isLoading, isError } = useQuery(
    ["topRated", page], // Query key includes the page number
    () => getTopMovies(page), // Fetch top-rated movies for the given page
    {
      keepPreviousData: true, // Cache previous data while loading new data
    }
  );

  // Fetch movie genres when the component mounts
  useEffect(() => {
    getGenres().then((response) => {
      if (Array.isArray(response)) {
        setGenres(response); // Store genres in state
      }
    });
  }, []); // Empty dependency array means this runs once on mount

  // Show a spinner if the data is still loading
  if (isLoading) {
    return <Spinner />;
  }

  // Show an error message if the data fetching failed
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Get the list of movies from the data object, or use an empty array if undefined
  const movies = data?.results || [];
  // Get the total number of pages from the data object
  const totalPages = data?.total_pages || 1;

  // Function to retrieve the genres for a specific movie
  const getMovieGenres = (movie) => {
    // If genres or movie genres are not available, return an empty array
    if (!genres || genres.length === 0 || !movie.genre_ids) {
      return [];
    }
    // Map movie genre ids to genre names from the genres list
    return movie.genre_ids
      .map((genreId) => genres.find((genre) => genre.id === genreId))
      .filter((genre) => genre); // Ensure valid genres are returned
  };

  // Handler for page change in the pagination component
  const handlePageChange = (event, value) => {
    setPage(value); // Update the page state with the new page number
  };

  return (
    <>
      <PageTemplate
        title="Top Rated" // Page title
        movies={movies} // List of movies to display
        action={(movie) => (
          // Icon button for adding a movie to the 'must watch' list
          <IconButton
            aria-label="add to must watch"
            onClick={() => {
              addToMustWatch(movie); // Add the movie to the 'must watch' list
              console.log("Must Watch Movies:", movie.id); // Log movie ID (for debugging)
            }}
          >
            <PlaylistAddIcon /> {/* Icon for the button */}
          </IconButton>
        )}
        getGenresForMovie={getMovieGenres} // Function to get genres for each movie
      />
      <Pagination
        count={totalPages} // Total number of pages
        page={page} // Current page
        onChange={handlePageChange} // Handler for page change
        color="primary" // Set the color of the pagination controls
        shape="rounded" // Rounded shape for pagination controls
        sx={{
          display: "flex",
          justifyContent: "center", // Center the pagination controls
          margin: "20px 0", // Add margin for spacing
        }}
      />
      {/* https://mui.com/material-ui/react-pagination/ */}
    </>
  );
};

//https://mui.com/material-ui/react-pagination/
export default TopMoviesPage;
