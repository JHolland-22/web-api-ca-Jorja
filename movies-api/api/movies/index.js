import express from 'express';
import asyncHandler from 'express-async-handler';
import movieModel from './movieModel';
import { getUpcomingMovies, getGenres} from '../tmdb-api';
import upcoming from '../../initialise-dev/upcoming';
import upcomingModel from '../upcomingMovies/upcomingModel';

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

export default router;
