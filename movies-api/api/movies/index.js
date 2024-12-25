import express from 'express';
import asyncHandler from 'express-async-handler';
import movieModel from './movieModel';
import {getGenres , getActor} from '../tmdb-api';
import upcoming from '../../initialise-dev/upcoming';
import topMovies from '../../initialise-dev/topMovies';
import actors from '../../initialise-dev/actors'; // Hardcoded actor data

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
    res.status(500).json({ message: 'Error fetching actors movies', error: error.message });
  }
}));



// Fetch a specific actor by ID
router.get('tmdb/actors/:id', asyncHandler(async (req, res) => {
  try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
          return res.status(400).json({ message: 'Invalid actor ID.' });
      }

      // Try to fetch actor by ID
      const actorData = await getActor(id);

      // If not found, return hardcoded actor data
      if (!actorData) {
          console.log(`Actor with ID ${id} not found from API. Returning hardcoded actor data.`);
          const hardcodedActor = actors.find((actor) => actor.id === id);
          if (hardcodedActor) {
              return res.status(200).json(hardcodedActor);
          } else {
              return res.status(404).json({ message: 'Actor not found.' });
          }
      }

      // If actor data fetched, return it
      res.status(200).json(actorData);
  } catch (error) {
      console.error('Error fetching actor:', error.message, error.stack);
      // Return hardcoded data in case of error
      console.log('Actor fetch failed, returning fallback.');
      const hardcodedActor = actors.find((actor) => actor.id === id);
      if (hardcodedActor) {
          return res.status(200).json(hardcodedActor);
      } else {
          return res.status(500).json({ message: 'Internal Server Error' });
      }
  }
}));

export default router;
