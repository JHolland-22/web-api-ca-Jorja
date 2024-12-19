import React from "react";
import ActorHeader from "../actorHeader";
import Grid from "@mui/material/Grid2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { getActorImages } from "../../api/tmdb-api";

const TemplateActorPage = ({ actor, children }) => {
  // Fetch images of the actor using the react-query hook
  const { data: images = [], error, isLoading, isError } = useQuery(
    ["images", { id: actor.id }],
    () => getActorImages(actor.id), // Fetch images from the API using the actor's id
    {
      enabled: !!actor?.id, // Only fetch images if actor id exists
    }
  );

  // Return loading spinner while the images are being fetched
  if (isLoading) return <Spinner />;

  // Return error message if there is an issue fetching images
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      {/* ActorHeader component displays information about the actor */}
      <ActorHeader actor={actor} />

      {/* Grid layout to display the actor's images and additional content */}
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{ xs: 3 }}>
          {/* Container for actor's images */}
          <div
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <ImageList
              sx={{
                height: "100vh", // Image list takes up full height of the viewport
              }}
              cols={1} // Display images in a single column
            >
              {/* Loop through the fetched images and display them */}
              {images.profiles?.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} // Image URL from TMDB API
                    alt={image.file_path} // Alt text for accessibility
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>
        {/* Render any additional content passed as children */}
        <Grid size={{ xs: 9 }}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;
