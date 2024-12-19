import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import img from '../../images/film-poster-placeholder.png';
import { MoviesContext } from "../../contexts/movieContext";
import WriteReviewIcon from "../cardIcons/writeReview";

export default function MovieCard(props) {
  const { movie } = props;
  const { favorites, addToFavorites, removeFromFavorites } = useContext(MoviesContext);
  const { watchlists, addToWatchlist, removeFromWatchlist } = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id);
  const isWatchlist = watchlists.includes(movie.id);

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    if (isWatchlist) {
      removeFromWatchlist(movie);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Card>
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
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleAddToFavorite}>
          <FavoriteIcon color={isFavorite ? "error" : "disabled"} fontSize="large" />
        </IconButton>
        <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlist}>
          <PlaylistAddIcon color={isWatchlist ? "primary" : "disabled"} fontSize="large" />
          </IconButton>

        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
        <WriteReviewIcon movie={movie} /> 
      </CardActions>
    </Card>
  );
}
