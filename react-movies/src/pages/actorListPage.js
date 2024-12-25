import React, { useState } from "react";
import { useQuery } from "react-query";
import { getActors } from "../api/tmdb-api"; // Function to fetch actors from API
import ActorListPageTemplate from "../components/templateActorListPage"; // Template for displaying the actor list
import Spinner from "../components/spinner"; // Spinner while loading data
import Pagination from "@mui/material/Pagination"; // For pagination

const ActorPage = () => {
  const [page, setPage] = useState(1); // Define page state

  // Fetching actors from the API using react-query's useQuery hook
  const { data, error, isLoading, isError } = useQuery(
    ["actors", { page }],  // Pass page as part of the query key
    ({ queryKey }) => getActors(queryKey), // Fetch actors based on the queryKey
    {
      keepPreviousData: true, // Keep previous data while loading the new page's data
    }
  );

  // Handle loading state
  if (isLoading) {
    return <Spinner />;
  }

  // Handle error state
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data?.results || []; // Actors list from API response
  const totalPages = data?.total_pages || 1; // Total pages from the API response

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value); // Set the page value when the user changes the page
  };

  return (
    <>
      {/* Render Actor List Template */}
      <ActorListPageTemplate
        title="Popular Actors"
        actors={actors} // Pass actors data to ActorListPageTemplate
      />
      
      {/* Pagination Component */}
      <Pagination
        count={totalPages} // Total pages for pagination
        page={page} // Current page
        onChange={handlePageChange} // Function to handle page changes
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

export default ActorPage;
