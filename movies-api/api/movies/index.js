import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getGenres, getMovieById, getPopularMovies, getTopRatedMovies } from '../tmdb-api';


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
  const upcomingMovies = await getUpcomingMovies();
  res.status(200).json(upcomingMovies);
}));

router.get('/genres', asyncHandler(async (req, res) => {
  const genres = await getGenres();
  res.status(200).json(genres);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await getMovieById(id);
  res.status(200).json(movie);
}));

router.get('/popular', asyncHandler(async (req, res) => {
  const popularMovies = await getPopularMovies();
  res.status(200).json(popularMovies);
}));

router.get('/top_rated', asyncHandler(async (req, res) => {
  const topRatedMovies = await getTopRatedMovies();
  res.status(200).json(topRatedMovies);
}));


export default router;
