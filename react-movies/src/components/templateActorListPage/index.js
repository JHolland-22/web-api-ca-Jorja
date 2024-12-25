import React, { useState, useEffect } from "react";
import Header from "../headerActorList";
import FilterActorsCard from "../filterActorsCard"; // For the name filter input
import ActorList from "../actorList"; // Displays the list of actors
import { getActors } from "../../api/tmdb-api"; // Fetching function
import Grid from "@mui/material/Grid2"; // Material UI Grid for layout

function ActorListPageTemplate({ title, action }) {
  const [actors, setActors] = useState([]); // State to store actors
  const [nameFilter, setNameFilter] = useState(""); // State to store name filter

  const args = [null, { page: 1 }];
  getActors(args)
    .then((data) => setActors(data.results)) // Update state with actor data
    .catch((error) => console.error("Error fetching actors:", error));
  

  const handleChange = (type, value) => {
    if (type === "name") {
      setNameFilter(value); // Update name filter value
    }
  };

  // Filter actors based on the search filter
  const displayedActors = actors.filter((actor) =>
    actor.name && actor.name.toLowerCase().includes(nameFilter.toLowerCase()) // Filter by name
  );

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} /> {/* Display title */}
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid
          key="find"
          size={{ xs: 10, sm: 7, md: 6, lg: 3, xl: 3 }}
          sx={{ padding: "20px" }}
        >
          {/* FilterActorsCard handles user input for filtering actors */}
          <FilterActorsCard
            onUserInput={handleChange} // Passes the handleChange function to handle input changes
            nameFilter={nameFilter} // Passes the current filter value to the card
          />
        </Grid>
        {/* ActorList displays the filtered list of actors */}
        <ActorList action={action} actors={displayedActors} />
      </Grid>
    </Grid>
  );
}

export default ActorListPageTemplate;
