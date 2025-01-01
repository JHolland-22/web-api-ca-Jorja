import express from 'express';
import UserDetails from './userFandWModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

router.get('/:username', asyncHandler(async (req, res) => {
    const username = req.params.username;
    const userDetails = await UserDetails.findByUsername(username);
    if(!userDetails) return res.status(401).json({ success: false, msg: "User details for user not found"});
    return res.status(200).json(userDetails);
}));

router.put('/:username/add', asyncHandler(async(req, res) => {
    const username = req.params.username;
    const { array, id } = req.body;

    try {
        const update = { $addToSet: { [array]: id } };
        const userDetails = await UserDetails.findOneAndUpdate({username: username}, update, { new: true });

        if(userDetails) {
            return res.status(200).json(userDetails);
        }
        res.status(400).json({status_code: 400, msg: "User not found"});
    } catch (error) {
        res.status(500).json({status_code: 500, message: error});
    }
}));

router.put('/:username/rem', asyncHandler(async(req, res) => {
    const username = req.params.username;
    const { array, id } = req.body;

    try {
        const update = { $pull: { [array]: id } };
        const userDetails = await UserDetails.findOneAndUpdate({username: username}, update, { new: true });

        if(userDetails) {
            return res.status(200).json(userDetails);
        }
        res.status(400).json({status_code: 400, msg: "User not found"});
    } catch (error) {
        res.status(500).json({status_code: 500, message: error});
    }
}));

export default router;