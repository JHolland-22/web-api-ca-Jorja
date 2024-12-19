import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/movieContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToWatchlistIcon = ({ movie }) => {
  // Access the MoviesContext to manage the watchlist
  const context = useContext(MoviesContext);

  // Function to handle adding the movie to the watchlist
  const handleAddToWatchlists = (e) => {
    e.preventDefault(); // Prevent default behavior (e.g., page refresh on form submission)
    context.addToWatchlist(movie); // Add the movie to the watchlist using the context function
  };

  return (
    <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlists}>
      <FavoriteIcon color="primary" fontSize="large" /> {/* Favorite icon styled as a button */}
    </IconButton>
  );
};

export default AddToWatchlistIcon;
