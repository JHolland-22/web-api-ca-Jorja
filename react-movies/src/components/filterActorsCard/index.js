import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CardMedia from "@mui/material/CardMedia";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg';

const formControl = {
  margin: 1, // Margin for the form controls (e.g., TextField)
  minWidth: 220, // Minimum width for the form controls
  backgroundColor: "rgb(0, 0, 0)", // Background color for the TextField
};

export default function FilterActorsCard(props) {
  // Function to handle the change in the search input field
  const handleTextChange = (e) => {
    props.onUserInput("name", e.target.value); // Pass the updated value to the parent component's function
  };

  return (
    // MUI Card component for creating a styled container
    <Card
      sx={{
        backgroundColor: "rgb(102, 0, 51)", // Background color for the card
      }}
      variant="outlined" // Outlined style for the card
    >
      <CardContent>
        {/* Title of the filter card with an icon */}
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" /> {/* Search icon */}
          Filter actors.
        </Typography>

        {/* TextField for searching actors by name */}
        <TextField
          sx={{ ...formControl }} // Apply formControl styles to the TextField
          id="filled-search" // ID for the input element
          label="Search field" // Label for the input
          type="search" // Search input type
          variant="filled" // Filled input field style
          value={props.nameFilter} // Controlled component: the value is passed as a prop
          onChange={handleTextChange} // Event handler for when the text changes
        />
      </CardContent>
      
      {/* CardMedia to display an image in the card */}
      <CardMedia
        sx={{ height: 300 }} // Set the height of the image
        image={img} // Image source for the media
        title="Filter" // Alt text for the image
      />
      
      <CardContent>
        {/* Title again in the second CardContent section */}
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter actors.
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}
