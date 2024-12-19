import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/movieContext";
import { ActorsContext } from "../../contexts/actorContext"; // Import ActorsContext only once


const RemoveFromFavoritesIcon = ({ movie, actor }) => {
  // Access the MoviesContext to manage the list of favorite movies
  const context = useContext(MoviesContext);
  const actorsContext = useContext(ActorsContext);

  // Function to handle removing the movie from the favorites list
  const handleRemoveFromFavorites = (e) => {
    e.preventDefault(); // Prevent default behavior (e.g., form submission)
    context.removeFromFavorites(movie); // Remove the movie from the favorites list using the context function
  }
  if (actor) {
    actorsContext.removeFromFavorites(actor); // Add the actor to favorites using ActorsContext
  };


  return (
    <IconButton
      aria-label="remove from favorites"
      onClick={handleRemoveFromFavorites}
    >
      {/* Icon button with delete icon for removing a movie from favorites */}
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;
