import React from "react";
import ActorCard from "../actorCard"; // Assuming this is the path to the ActorCard component
import Grid from "@mui/material/Grid2"; // Material UI Grid component for layout

const ActorList = (props) => {
  let actorCards = props.actors.map((actor) => (
    <Grid
      key={actor.id} // Unique key for each actor
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} // Responsive layout
      sx={{ padding: "20px" }} // Optional padding
    >
      <ActorCard key={actor.id} actor={actor} /> {/* Render ActorCard for each actor */}
    </Grid>
  ));

  return actorCards; // Return the list of actor cards
};

export default ActorList;
