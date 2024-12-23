import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import { getMovieCredits } from "../../api/tmdb-api";
import ActorCard from "../actorCard";
import { Drawer } from "@mui/material";
import MovieReviews from "../movieReviews";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = (props) => {
  const movie = props.movie;
  const [cast, setCast] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const data = await getMovieCredits(movie.id);
        setCast(data.cast.slice(0, 10));
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchMovieCredits();
  }, [movie.id]);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={{ ...root }}>
        <li>
          <Chip label="Genres" sx={{ ...chip }} color="primary" />
        </li>
        {movie.genres && movie.genres.length > 0 ? (
          movie.genres.map((g) => (
            <li key={g.name}>
              <Chip label={g.name} sx={{ ...chip }} />
            </li>
          ))
        ) : (
          <Typography variant="body2">No genres available</Typography>
        )}
      </Paper>

      <Paper component="ul" sx={{ ...root }}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />

        <Chip
          icon={<MonetizationIcon />}
          label={movie.revenue ? `${movie.revenue.toLocaleString()}` : 'N/A'}
        />

        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />

        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
        Cast
      </Typography>
      <Paper component="ul" sx={{ ...root }}>
        {cast.map((actor) => (
          <li key={actor.id}>
            <ActorCard actor={actor} />
          </li>
        ))}
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: 2,
          right: 2,
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
