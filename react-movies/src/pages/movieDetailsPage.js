import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";

const MoviePage = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const movieData = await response.json();
        setMovie(movieData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchMovieImages = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch movie images");
        const imageData = await response.json();
        setImages(imageData.posters || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieImages();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <h1>{error}</h1>;

  return movie ? (
    <PageTemplate movie={movie}>
      <MovieDetails movie={movie} images={images} />
    </PageTemplate>
  ) : (
    <p>Waiting for movie details</p>
  );
};

export default MoviePage;
