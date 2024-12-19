import React, { useState } from "react";

// Create a context for storing favorite actors
export const ActorsContext = React.createContext(null);

const ActorsContextProvider = (props) => {
  // State to hold the list of favorite actors (storing only their IDs)
  const [favoriteActors, setFavoriteActors] = useState([]);

  // Function to add an actor to the favorite actors list
  const addToFavorites = (actor) => {
    // Only add the actor if they are not already in the favorite list
    if (!favoriteActors.includes(actor.id)) {
      setFavoriteActors([...favoriteActors, actor.id]);
    }
  };

  // Function to remove an actor from the favorite actors list
  const removeFromFavorites = (actor) => {
    // Filter out the actor from the list by comparing actor IDs
    setFavoriteActors(favoriteActors.filter((actorId) => actorId !== actor.id));
  };

  return (
    // The provider makes the context and its functions available to all child components
    <ActorsContext.Provider
      value={{
        favoriteActors,          // List of favorite actors (actor IDs)
        addToFavorites,     // Function to add an actor to favorites
        removeFromFavorites, // Function to remove an actor from favorites
      }}
    >
      {props.children} {/* Children components will have access to the context */}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;
