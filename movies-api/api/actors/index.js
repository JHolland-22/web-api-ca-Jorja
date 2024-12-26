import { getActor } from '../tmdb-api'; 
import asyncHandler from 'express-async-handler';
import express from 'express';
import actors from '../../initialise-dev/actors'; // Hardcoded actor data

const router = express.Router();

// Route to get a paginated list of actors
router.get('/tmdb/actors', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;

    page = +page; // Convert to number
    limit = +limit; // Convert to number
  
    if (isNaN(page) || page <= 0) page = 1; // Validate page
    if (isNaN(limit) || limit <= 0) limit = 10; // Validate limit
  
    try {
      const total_results = actors.length; // Total number of actors
      const results = actors.slice((page - 1) * limit, page * limit); // Slice actors array for current page
  
      const total_pages = Math.ceil(total_results / limit); // Calculate total pages
  
      // Send paginated response
      res.status(200).json({
        page,
        total_pages,
        total_results,
        results: results || [],
      });
    } catch (error) {
      // Handle server error
      res.status(500).json({ message: 'Error fetching actors movies', error: error.message });
    }
}));

// Route to fetch a specific actor by ID
router.get('/tmdb/actors/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10); // Get actor ID from URL parameters
        if (isNaN(id)) {
            // Return error if ID is invalid
            return res.status(400).json({ message: 'Invalid actor ID.' });
        }

        // Try to fetch actor data from external API
        const actorData = await getActor(id);

        // If actor not found from API, fallback to hardcoded data
        if (!actorData) {
            console.log(`Actor with ID ${id} not found from API. Returning hardcoded actor data.`);
            const hardcodedActor = actors.find((actor) => actor.id === id);
            if (hardcodedActor) {
                return res.status(200).json(hardcodedActor); // Return hardcoded actor
            } else {
                return res.status(404).json({ message: 'Actor not found.' }); // Actor not found in hardcoded data
            }
        }

        // Return actor data if fetched successfully
        res.status(200).json(actorData);
    } catch (error) {
        console.error('Error fetching actor:', error.message, error.stack);
        // Return fallback actor in case of error
        console.log('Actor fetch failed, returning fallback.');
        const hardcodedActor = actors.find((actor) => actor.id === id);
        if (hardcodedActor) {
            return res.status(200).json(hardcodedActor); // Return fallback actor data
        } else {
            // Handle internal server error
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}));
export default router;
