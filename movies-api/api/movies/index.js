import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getGenres } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get movie details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);  // Ensure `findByMovieDBId` is defined correctly in your movie model
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found', status_code: 404 });
    }
}));

// Get upcoming movies from TMDB
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    try {
        const upcomingMovies = await getUpcomingMovies();
        res.status(200).json(upcomingMovies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching upcoming movies', error: error.message });
    }
}));
// Get movie genres
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getGenres(); // Fetch genres using the getGenres function
        res.status(200).json(genres); // Return the genres array as a response
    } catch (error) {
        console.error(error); // Log the error if any
        res.status(500).json({ success: false, msg: 'Failed to fetch genres' }); // Handle error
    }
}));
export default router;