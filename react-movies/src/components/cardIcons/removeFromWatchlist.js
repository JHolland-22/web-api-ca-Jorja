import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/movieContext";

const RemoveFromWatchlistsIcon = ({ movie }) => {
  // Access the MoviesContext to manage the watchlist
  const context = useContext(MoviesContext);

  // Function to handle removing the movie from the watchlist
  const handleRemoveFromWatchList = (e) => {
    e.preventDefault(); // Prevent the default behavior (e.g., form submission)
    context.removeFromWatchlist(movie); // Remove the movie from the watchlist using the context function
  };

  return (
    <IconButton
      aria-label="remove from watchlist"
      onClick={handleRemoveFromWatchList}
    >
      {/* Icon button with delete icon to remove the movie from the watchlist */}
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromWatchlistsIcon;
