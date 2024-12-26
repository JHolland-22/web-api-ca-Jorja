import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";

const ActorDetailsPage = () => {
  const { id } = useParams();  // Get actor ID from the URL
  const [actor, setActor] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/movies/tmdb/actors/${id}`, {
            headers: {
              'Authorization': window.localStorage.getItem('token'), // Ensure token is included
            }
          }
        );

        if (!response.ok) {
          const responseText = await response.text(); // Get raw response text
          
          if (responseText.includes('<html>')) {
            throw new Error("Received HTML instead of JSON. This might be an error page.");
          }
          
          const errorData = JSON.parse(responseText); // Try to parse the error message
          throw new Error(errorData.message || 'Failed to fetch actor details');
        }

        const actorData = await response.json();
        setActor(actorData);  // Store actor data in state
      } catch (err) {
        setError(err.message);  // Handle errors
      } finally {
        setIsLoading(false);  // Set loading to false after fetching
      }
    };

    fetchActorDetails();
  }, [id]);  // Run on component mount and when `id` changes

  // Display loading state
  if (isLoading) return <p>Loading...</p>;

  // Display error message if fetch failed
  if (error) return <h1>{error}</h1>;

  // If actor data exists, render it
  return actor ? (
    <PageTemplate actor={actor}>  {/* Pass actor data to page template */}
      <ActorDetails actor={actor} />
    </PageTemplate>
  ) : (
    <p>No actor details found</p>  // Fallback message if actor data doesn't exist
  );
};

export default ActorDetailsPage;
