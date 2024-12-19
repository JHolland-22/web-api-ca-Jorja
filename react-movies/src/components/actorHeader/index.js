import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const ActorHeader = (props) => {
  const actor = props.actor; // Access actor details from props.
  const navigate = useNavigate(); // Hook for handling navigation.

  return (
    <Paper 
      component="div" 
      sx={{
        display: "flex", // Arrange child elements in a row.
        justifyContent: "space-around", // Space out elements evenly.
        flexWrap: "wrap", // Allow wrapping to the next row if necessary.
        padding: 1.5, // Add padding to the container.
        margin: 0, // Remove default margins.
      }}
    >
      {/* Back navigation button */}
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" /> {/* Back arrow icon */}
      </IconButton>

      {/* Display the actor's name */}
      <Typography variant="h4" component="h3">
        {actor.name}
        <br />
      </Typography>

      {/* Forward navigation button */}
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" /> {/* Forward arrow icon */}
      </IconButton>
    </Paper>
  );
};

export default ActorHeader;
