import React, { useContext } from "react";
import PageTemplate from "../components/templateActorListPage";
import { ActorsContext } from "../contexts/actorContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";

const FavoriteActorsPage = () => {
  // Access the list of favorite actor IDs from the context
  const { favoriteActors: actorIds } = useContext(ActorsContext);

  // Fetch data for each favorite actor using useQueries
  const favoriteActorQueries = useQueries(
    actorIds.map((actorId) => ({
      queryKey: ["actor", { id: actorId }], // Unique query key for each actor
      queryFn: getActor, // Function to fetch actor data from the API
    }))
  );

  // Check if any of the queries are still loading
  const isLoading = favoriteActorQueries.find((m) => m.isLoading === true);

  // If any query is still loading, show the Spinner component
  if (isLoading) {
    return <Spinner />;
  }

  // Map over the query results and extract actor data
  const actors = favoriteActorQueries.map((q) => q.data);

  return (
    // Pass the actors data and action for each actor to the PageTemplate component
    <PageTemplate
      title="Favorite Actors" // Title of the page
      actors={actors} // The list of favorite actors
      action={(actor) => <RemoveFromFavorites actor={actor} />} // Action to remove from favorites
    />
  );
};

export default FavoriteActorsPage;
// this page does not work properly sorry :\