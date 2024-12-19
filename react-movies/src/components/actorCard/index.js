import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import img from '../../images/film-poster-placeholder.png';
import { ActorsContext } from "../../contexts/actorContext";

export default function ActorCard({ actor }) {
  const { favoriteActors = [], addToFavorites, removeFromFavorites } = useContext(ActorsContext); // Access favorite actors and context functions.
  const isFavorite = favoriteActors.includes(actor.id); // Check if the actor is in the favorites list.

  // Toggle favorite status when the button is clicked.
  const handleAddToFavorite = (e) => {
    e.preventDefault(); // Prevent any default link behavior.
    if (isFavorite) {
      removeFromFavorites(actor); // Remove from favorites if already added.
    } else {
      addToFavorites(actor); // Add to favorites if not.
    }
  };

  return (
    <Card>
      {/* Header with actor's name and a favorite icon (red if it's a favorite) */}
      <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {actor.name} {/* Display the actor's name */}
          </Typography>
        }
      />
      {/* Display actor's image or a placeholder */}
      <CardMedia
        sx={{ height: 500 }} // Set a fixed height for the image.
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` // Use actor's profile picture if available.
            : img // Use placeholder image if no profile picture exists.
        }
        alt={actor.name || "No name available"} // Accessible alternative text for the image.
      />
      {/* Show additional actor details in a grid */}
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              {actor.birth_day} {/* Actor's birth date (if available) */}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              {actor.vote_average} {/* Actor's average vote (if available) */}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {/* Action buttons for interacting with the actor card */}
      <CardActions disableSpacing>
        {/* Favorite button */}
        <IconButton aria-label="add to favorites" onClick={handleAddToFavorite}>
          <FavoriteIcon color={isFavorite ? "error" : "disabled"} fontSize="large" />
        </IconButton>
        {/* Link to more actor details */}
        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info .......
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
