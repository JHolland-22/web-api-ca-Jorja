import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import MovieCard from "../movieCard";
import { getActorMovies } from "../../api/tmdb-api";

const root = {
  display: "flex", // Arrange chips in a flexible row layout.
  justifyContent: "center", // Center-align the chips.
  flexWrap: "wrap", // Wrap chips to the next row if necessary.
  listStyle: "none", // Remove default list styling.
  padding: 1.5, // Add padding inside the container.
  margin: 0, // Remove default external margins.
};

const ActorDetails = ({ actor }) => {
  const [movies, setMovies] = useState([]); // State for storing the actor's movies.

  useEffect(() => {
    // Fetch movies in which the actor appears.
    const fetchActorMovies = async () => {
      try {
        const data = await getActorMovies(actor.id); // Fetch movie data using the actor's ID.
        setMovies(data.cast.slice(0, 10)); // Store up to 10 movies in the state.
      } catch (error) {
        console.error("Error fetching actor movies:", error); // Log any errors during fetch.
      }
    };

    fetchActorMovies(); // Call the function on component mount or when actor ID changes.
  }, [actor.id]); // Re-run the effect only if actor ID changes.

  return (
    <>
      {/* Overview Section */}
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Typography variant="h6" component="p">
        {actor.biography || "No biography available."} {/* Actor's biography */}
      </Typography>

      {/* Known For Section */}
      <Paper component="ul" sx={{ ...root }}>
        <Chip
          icon={<StarRate />} // Add an icon.
          label={`Known for: ${actor.known_for_department || "N/A"}`} // Actor's main field of work.
        />
      </Paper>

      {/* Additional Details Section */}
      <Paper component="ul" sx={{ ...root }}>
        <Chip
          icon={<AccessTimeIcon />} // Icon for time-related data.
          label={`Born: ${actor.birthday || "N/A"}`} // Actor's birth date.
        />
        <Chip
          icon={<MonetizationIcon />} // Icon for revenue.
          label={`Net Worth: ${
            actor.revenue ? actor.revenue.toLocaleString() : "N/A" // Format revenue if available.
          }`}
        />
        <Chip
          icon={<StarRate />} // Icon for rating-related data.
          label={`Vote Average: ${actor.popularity || "N/A"}`} // Actor's popularity.
        />
      </Paper>

      {/* Movies Section */}
      <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
        Movies
      </Typography>
      <Paper component="ul" sx={{ ...root }}>
        {movies.map((movie) => (
          <li key={movie.id}> {/* Use a unique key for each movie. */}
            <MovieCard movie={movie} /> {/* Render MovieCard component for each movie. */}
          </li>
        ))}
      </Paper>
    </>
  );
};

export default ActorDetails;
