import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Actorheader = (props) => {
  const title = props.title; // Get the title passed as a prop
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  return (
    // Paper component acts as a wrapper for the header
    <Paper 
      component="div" 
      sx={{
        display: "flex", // Use flexbox to arrange the contents
        justifyContent: "space-around", // Space out elements evenly
        flexWrap: "wrap", // Allow wrapping of elements if necessary
        marginBottom: 1.5, // Add margin at the bottom
      }}
    >
      {/* Back navigation button */}
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" /> {/* Back arrow icon */}
      </IconButton>

      {/* Title section displaying the title prop */}
      <Typography variant="h4" component="h3">
        {title} {/* Display the title passed as a prop */}
      </Typography>

      {/* Forward navigation button */}
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" /> {/* Forward arrow icon */}
      </IconButton>
    </Paper>
  );
};

export default Actorheader;
