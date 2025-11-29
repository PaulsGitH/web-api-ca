import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getUpcomingMovies, getGenres, getMovieById, getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getMoviesPage, getNowPlayingMoviesPaged, getUpcomingMoviesPaged, searchMovies, getPersonDetails, getPersonMovieCredits, searchPeople } from '../tmdb-api';


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

router.get('/search', asyncHandler(async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q || q.length < 2) {
    return res.status(200).json({ results: [] });
  }

  const results = await searchMovies(q);
  res.status(200).json(results);
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

router.get('/now_playing', asyncHandler(async (req, res) => {
  const nowPlaying = await getNowPlayingMovies();
  res.status(200).json(nowPlaying);
}));

router.get('/discover/page/:page', asyncHandler(async (req, res) => {
  const page = Number(req.params.page) || 1;
  const movies = await getMoviesPage(page);
  res.status(200).json(movies);
}));

router.get('/now_playing/page/:page', asyncHandler(async (req, res) => {
  const page = Number(req.params.page) || 1;
  const nowPlaying = await getNowPlayingMoviesPaged(page);
  res.status(200).json(nowPlaying);
}));

router.get('/upcoming/page/:page', asyncHandler(async (req, res) => {
  const page = Number(req.params.page) || 1;
  const upcoming = await getUpcomingMoviesPaged(page);
  res.status(200).json(upcoming);
}));

router.get('/people/search', asyncHandler(async (req, res) => {
  const query = (req.query.query || '').trim();
  if (!query || query.length < 2) {
    return res.status(200).json({ results: [] });
  }

  const results = await searchPeople(query);
  res.status(200).json(results);
}));

router.get('/people/:id/credits', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const credits = await getPersonMovieCredits(id);
  res.status(200).json(credits);
}));

router.get('/people/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const person = await getPersonDetails(id);
  res.status(200).json(person);
}));



export default router;
