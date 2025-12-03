import express from 'express';
import asyncHandler from 'express-async-handler';
import UserReview from './reviewModel';
import authenticate from '../../authenticate';

const router = express.Router();
router.use(authenticate);


// Returns all user reviews
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const username = req.user.username;
    const reviews = await UserReview.find({ username }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  })
);


// Creates a new user review
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { movieId, rating, content } = req.body;
    const username = req.user.username;

    if (!movieId || rating === undefined || !content) {
      return res
        .status(400)
        .json({ success: false, msg: 'movieId, rating and content are required.' });
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

// Returns all user reviews for a specific movie
router.get(
  '/movie/:movieId',
  asyncHandler(async (req, res) => {
    const movieId = Number(req.params.movieId);

    if (Number.isNaN(movieId)) {
      return res.status(400).json({ success: false, msg: 'movieId must be a number.' });
    }

    const username = req.user.username;
    const reviews = await UserReview.find({ movieId, username }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  })
);

// Deletes a review by id
router.delete(
  '/:id',
  authenticate,       
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;

    const review = await UserReview.findOneAndDelete({ _id: id, username });

    if (!review) {
      return res.status(404).json({ success: false, msg: 'Review not found.' });
    }

    res.status(200).json({ success: true, msg: 'Review deleted.' });
  })
);

// Update a review by id
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;
    const { rating, content } = req.body;

    const review = await UserReview.findOneAndUpdate(
      { _id: id, username },
      {
        rating,
        content,
      },
      { new: true }
    );

    if (!review) {
      return res
        .status(404)
        .json({ success: false, msg: 'Review not found.' });
    }

    res.status(200).json({ success: true, review });
  })
);


export default router;