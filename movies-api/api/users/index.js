import express from 'express';
import User from './userModel';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Server error', error: error.message });
    }
});

router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

router.put('/:id', async (req, res) => {
    try {
        if (req.body._id) delete req.body._id;
        const result = await User.updateOne({ _id: req.params.id }, req.body);
        if (result.matchedCount) {
            res.status(200).json({ code: 200, msg: 'User updated successfully' });
        } else {
            res.status(404).json({ code: 404, msg: 'Unable to update user' });
        }
    } catch (error) {
        res.status(500).json({ code: 500, msg: 'Server error', error: error.message });
    }
});

// Add to user's favorites
router.post('/:userId/favorites', asyncHandler(async (req, res) => {
    if (!req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    const { userId } = req.params;
    const { movieId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.updateOne(
            { _id: userId },
            { $addToSet: { favorites: movieId.toString() } } // Ensures movieId is unique in favorites
        );

        const updatedUser = await User.findById(userId);
        res.status(200).json({
            message: 'Favorite movie added successfully.',
            favorites: updatedUser.favorites
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
}));


// Get user's favorites
router.get('/:userId/favorites', asyncHandler(async (req, res) => {
    if (!req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}));


async function registerUser(req, res) {
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username, _id: user._id }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

export default router;
