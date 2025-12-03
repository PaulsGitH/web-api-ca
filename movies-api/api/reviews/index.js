import express from 'express';
import asyncHandler from 'express-async-handler';
import UserReview from './reviewModel.js';

const router = express.Router();



// Returns all user reviews
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const reviews = await UserReview.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  })
);

// Creates a new user review
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { movieId, username, rating, content } = req.body;

    if (!movieId || !username || rating === undefined || !content) {
      return res
        .status(400)
        .json({ success: false, msg: 'movieId, username, rating and content are required.' });
    }

    const numericRating = Number(rating);
    if (Number.isNaN(numericRating) || numericRating < 0 || numericRating > 10) {
      return res
        .status(400)
        .json({ success: false, msg: 'Rating must be a number between 0 and 10.' });
    }

    const review = await UserReview.create({
      movieId,
      username,
      rating: numericRating,
      content,
    });

    res.status(201).json({ success: true, review });
  })
);

export default router;
