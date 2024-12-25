import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { getActors } from "../api/tmdb-api"; // Function to fetch actors from API
import PageTemplate from "../components/templateActorListPage"; // Template for displaying the actor list
import Spinner from "../components/spinner"; // Spinner component while loading data
import { ActorsContext } from "../contexts/actorContext"; // Context for actions like adding to the watch list
import Pagination from "@mui/material/Pagination"; // Pagination component
import IconButton from "@mui/material/IconButton"; // Icon button for adding to the watch list
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"; // Playlist add icon

const ActorsPage = () => {
  const [page, setPage] = useState(1); // State to store the current page

  // Access the function to add actors to the 'watch list' from context
  const { addToWatchList } = useContext(ActorsContext);

  // Fetch actors using react-query's useQuery hook
  const { data, isLoading, isError, error } = useQuery(
    ['actors', page], // Query key with page as part of key
    () => getActors([null, { page }]), // Fetch actors data based on the page
    {
      keepPreviousData: true, // Keep previous data while fetching new data
    }
  );

  // Show a spinner while the data is loading
  if (isLoading) {
    return <Spinner />;
  }

  // Show an error message if the data fetching failed
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Get the list of actors from the data object, or use an empty array if undefined
  const actors = data?.results || [];
  // Get the total number of pages from the data object
  const totalPages = data?.total_pages || 1;

  // Handler for page change in pagination
  const handlePageChange = (event, value) => {
    setPage(value); // Update page state with the new page number
  };

  return (
    <>
      <PageTemplate
        title="Actors" // Page title
        actors={actors} // List of actors to display
        action={(actor) => (
          // Icon button to add actor to the watch list
          <IconButton
            aria-label="add to watch list"
            onClick={() => {
              addToWatchList(actor); // Add actor to the watch list
              console.log("Watch List Actor:", actor.id); // Log actor ID (for debugging)
            }}
          >
            <PlaylistAddIcon /> {/* Icon for the button */}
          </IconButton>
        )}
      />
      
      {/* Pagination */}
      <Pagination
        count={totalPages} // Total pages
        page={page} // Current page
        onChange={handlePageChange} // Handle page change
        color="primary" // Set color
        shape="rounded" // Rounded pagination buttons
        sx={{
          display: "flex",
          justifyContent: "center", // Center pagination
          margin: "20px 0", // Add margin
        }}
      />
    </>
  );
};

export default ActorsPage;
