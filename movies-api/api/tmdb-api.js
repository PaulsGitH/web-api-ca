import fetch from 'node-fetch';

export const getMovies = async () => {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    );

    if (!response.ok) {
        throw new Error(response.json().message);
    }

    return await response.json();
};


export const getUpcomingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error((await response.json()).message);
  }

  return await response.json();
};

export const getGenres = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error((await response.json()).message);
  }

  return await response.json();
};

export const getMovieById = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&append_to_response=images,reviews,credits,similar,recommendations,videos,release_dates,keywords,external_ids`
  );

  if (!response.ok) {
    throw new Error((await response.json()).message);
  }

  return await response.json();
};

export const getPopularMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error((await response.json()).message);
  }

  return await response.json();
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error((await response.json()).message);
  }

  return await response.json();
};

export const getNowPlayingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
  );

  if (!response.ok) {
    throw new Error((await response.json()).message);
  }

  return await response.json();
};
