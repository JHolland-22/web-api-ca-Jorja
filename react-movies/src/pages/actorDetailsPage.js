import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";

const ActorDetailsPage = () => {
  // Get the actor ID from the URL parameters
  const { id } = useParams();

  // State variables to manage actor details, loading state, and error handling
  const [actor, setActor] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the actor details when the component mounts or when the actor ID changes
  useEffect(() => {
    const fetchActorDetails = async () => {
      // Set loading state to true and reset previous error
      setIsLoading(true);
      setError(null);
      try {
        // Fetch actor details from The Movie Database API
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch actor details");

        // Parse the response data
        const actorData = await response.json();
        // Set the actor state with the fetched data
        setActor(actorData);
      } catch (err) {
        // If an error occurs, set the error message
        setError(err.message);
      } finally {
        // Set loading state to false when the fetch operation is complete
        setIsLoading(false);
      }
    };

    fetchActorDetails(); // Invoke the function to fetch actor details
  }, [id]); // Dependency on actor ID (id)

  // If data is still loading, show a loading message
  if (isLoading) return <p>Loading...</p>;

  // If there was an error fetching data, display the error message
  if (error) return <h1>{error}</h1>;

  // If the actor data is successfully fetched, render the PageTemplate and ActorDetails components
  return actor ? (
    <PageTemplate actor={actor}>
      <ActorDetails actor={actor} />
    </PageTemplate>
  ) : (
    // If actor data is not yet available, show a waiting message
    <p>Waiting for actor details...</p>
  );
};

export default ActorDetailsPage;
