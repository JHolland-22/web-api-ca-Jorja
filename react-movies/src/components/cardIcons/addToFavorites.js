import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/movieContext";
import { ActorsContext } from "../../contexts/actorContext"; // Import ActorsContext only once
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavoritesIcon = ({ movie, actor }) => {
  // Access both contexts: MoviesContext for movie favorites and ActorsContext for actor favorites
  const moviesContext = useContext(MoviesContext);
  const actorsContext = useContext(ActorsContext);

  // Function to handle adding the movie and actor to favorites
  const handleAddToFavorites = (e) => {
    e.preventDefault(); // Prevent default behavior
    if (movie) {
      moviesContext.addToFavorites(movie); // Add the movie to favorites using MoviesContext
    }
    if (actor) {
      actorsContext.addToFavorites(actor); // Add the actor to favorites using ActorsContext
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" /> {/* Favorite icon for the button */}
    </IconButton>
  );
};

export default AddToFavoritesIcon;
