import express from 'express';
import asyncHandler from 'express-async-handler';
import UserReview from './reviewModel.js';

const router = express.Router();

// GET /api/reviews
// Returns all user reviews
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const reviews = await UserReview.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  })
);

export default router;
