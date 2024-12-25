import { getActor, getActors } from '../tmdb-api';
import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Invalid page or limit parameters.' });
        }

        const actors = await getActors(page);
        res.status(200).json(actors);
    } catch (error) {
        console.error('Error fetching actors:', error.message, error.stack);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}));

router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid actor ID.' });
        }

        const actor = await getActor(id);
        if (actor) {
            res.status(200).json(actor);
        } else {
            res.status(404).json({ message: 'The actor you requested could not be found.', status_code: 404 });
        }
    } catch (error) {
        console.error('Error fetching actor:', error.message, error.stack);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}));

export default router;
