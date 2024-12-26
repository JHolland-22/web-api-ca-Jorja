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

  const { addToWatchList } = useContext(ActorsContext); // Access the function to add actors to the 'watch list' from context

  // Fetching actors from the API using react-query's useQuery hook
  const { data, isLoading, isError, error } = useQuery(
    ['actors', page], // Query key for fetching actors, including page for pagination
    () => getActors([null, { page }]), // API function for fetching actors
    {
      keepPreviousData: true, // Keep previous data while fetching new data
    }
  );

  // Handle loading state
  if (isLoading) {
    return <Spinner />;
  }

  // Handle errors if fetching fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data?.results || []; // Actors list from API response
  const totalPages = data?.total_pages || 1; // Total number of pages for pagination

  const handlePageChange = (event, value) => {
    setPage(value); // Set the current page when pagination changes
  };

  return (
    <>
      {/* Render Actor List Template */}
      <PageTemplate
        title="Actors"
        actors={actors} // Pass actors data to PageTemplate
        action={(actor) => (
          <IconButton
            aria-label="add to watch list"
            onClick={() => {
              addToWatchList(actor); // Add actor to watch list
              console.log("Watch List Actor:", actor.id); // Log actor ID for debugging
            }}
          >
            <PlaylistAddIcon />
          </IconButton>
        )}
      />
      
      {/* Pagination controls */}
      <Pagination
        count={totalPages} // Total number of pages
        page={page} // Current page
        onChange={handlePageChange} // Handle page change
        color="primary"
        shape="rounded"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0",
        }}
      />
    </>
  );
};

export default ActorsPage;
