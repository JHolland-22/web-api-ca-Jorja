import { useQuery } from "react-query";
import { getActors } from "../api/tmdb-api"; // Function to fetch actors from API
import ActorListPageTemplate from "../components/templateActorListPage"; // Template for displaying the actor list
import Spinner from "../components/spinner"; // Spinner while loading data

const ActorPage = () => {
  // Fetching actors from the API using react-query's useQuery hook
  const { data, error, isLoading, isError } = useQuery(
    ["actors"], // Query key for fetching actors
    () => getActors(), // API function for fetching actors
  );

  // Handle errors if fetching fails
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data?.results || []; // Actors list from API response

  return (
    <>
      {/* Render Actor List Template */}
      <ActorListPageTemplate
        title="Popular Actors"
        actors={actors} // Pass actors data to ActorListPageTemplate
      />
    </>
  );
};

export default ActorPage;
