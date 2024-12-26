import express from 'express';
import asyncHandler from 'express-async-handler';
import movieModel from './movieModel';
import {getGenres, getActor } from '../tmdb-api';
import upcoming from '../../initialise-dev/upcoming';
import topMovies from '../../initialise-dev/topMovies';
import actors from '../../initialise-dev/actors'; // Hardcoded actor data
import actorModel from '../actors/actorModel';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = +page;
    limit = +limit;
    
    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(limit) || limit <= 0) limit = 10;
  
    try {
      const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find()
          .limit(limit)
          .skip((page - 1) * limit)
      ]);
  
      const total_pages = Math.ceil(total_results / limit);
  
      const returnObject = {
        page,
        total_pages,
        total_results,
        results: results || []
      };
  
      res.status(200).json(returnObject);
    } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ message: 'Error fetching movies', error: error.message });
    }
  }));
  
  


router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found', status_code: 404 });
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = +page;
  limit = +limit;

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  try {
    const total_results = upcoming.length;
    const results = upcoming.slice((page - 1) * limit, page * limit);

    const total_pages = Math.ceil(total_results / limit);

    res.status(200).json({
      page,
      total_pages,
      total_results,
      results: results || [],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching upcoming movies', error: error.message });
  }
}));


router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getGenres();
        res.status(200).json(genres);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Failed to fetch genres' });
    }
}));

router.get('/tmdb/toprated', asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = +page;
  limit = +limit;

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  try {
    const total_results = topMovies.length;
    const results = topMovies.slice((page - 1) * limit, page * limit);

    const total_pages = Math.ceil(total_results / limit);

    res.status(200).json({
      page,
      total_pages,
      total_results,
      results: results || [],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top movies', error: error.message });
  }
}));

router.get('/tmdb/actors', asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  page = +page;
  limit = +limit;

  if (isNaN(page) || page <= 0) page = 1;
  if (isNaN(limit) || limit <= 0) limit = 10;

  try {
    const total_results = actors.length;
    const results = actors.slice((page - 1) * limit, page * limit);

    const total_pages = Math.ceil(total_results / limit);

    res.status(200).json({
      page,
      total_pages,
      total_results,
      results: results || [],
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching actors', error: error.message });
  }
}));
router.get('/tmdb/actors/:id', asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const actor = actors.find(actor => actor.id === id);

  if (actor) {
    res.status(200).json(actor);
  } else {
    res.status(404).json({ message: `Actor with ID ${id} not found`, status_code: 404 });
  }
}));




router.get('/tmdb/person/:id/images', asyncHandler(async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid actor ID.' });
    }

    const actorImageData = await getActorImages(id);

    if (!actorImageData || !actorImageData.profiles || actorImageData.profiles.length === 0) {
      console.log(`Actor with ID ${id} not found from API. Returning fallback actor data.`);
      
      const hardcodedActor = actors.find((actor) => actor.id === id);
      if (hardcodedActor) {
        return res.status(200).json(hardcodedActor);
      } else {
        return res.status(404).json({ message: 'Actor not found.' });
      }
    }

    return res.status(200).json(actorImageData);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}));


router.get('/tmdb/movies/:id/images', asyncHandler(async (req, res) => {
  try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
          return res.status(400).json({ message: 'Invalid movie ID.' });
      }

      const movieData = await getMovieImages(id);

      if (!movieData) {
          const hardcodedMovie = movies.find((movie) => movie.id === id);
          if (hardcodedMovie) {
              return res.status(200).json(hardcodedMovie);
          } else {
              return res.status(404).json({ message: 'Movie not found.' });
          }
      }

      return res.status(200).json(movieData);
  } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message });
  }
}));

export default router;
