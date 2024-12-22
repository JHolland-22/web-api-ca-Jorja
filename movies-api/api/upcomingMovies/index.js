import express from 'express';
import upcomingModel from './upcomingModel';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', expressAsyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = +page;
    limit = +limit;

    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(limit) || limit <= 0) limit = 10;

    try {
        const [total_results, results] = await Promise.all([
            upcomingModel.estimatedDocumentCount(),
            upcomingModel.find()
                .limit(limit)
                .skip((page - 1) * limit)
        ]);

        const total_pages = Math.ceil(total_results / limit);

        res.status(200).json({
            page,
            total_pages,
            total_results,
            results: results || []
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching upcoming movies', error: error.message });
    }
}));

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    upcomingModel.findByMovieDBId(id)
        .then(upcomingMovies => res.status(200).send(upcomingMovies))
        .catch(next);
});

export default router;
