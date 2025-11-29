import React, { useState, useMemo } from "react";
import { useNotify } from "../components/notifyProvider";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const notify = typeof useNotify === "function" ? useNotify() : () => {};

  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.includes(movie.id)) return prev;
      notify(`${movie.title || "Movie"} added to favorites`);
      return [...prev, movie.id];
    });
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => {
      const next = prev.filter((mId) => mId !== movie.id);
      if (next.length !== prev.length) notify(`${movie.title || "Movie"} removed from favorites`);
      return next;
    });
  };

  const addReview = (movie, review) => {
    setMyReviews((prev) => {
      const next = { ...prev, [movie.id]: review };
      notify(`Review saved for ${movie.title || "movie"}`);
      return next;
    });
  };

  const addToMustWatch = (movie) => {
    setMustWatch((prev) => {
      if (prev.includes(movie.id)) return prev;
      notify(`${movie.title || "Movie"} added to Must Watch`);
      return [...prev, movie.id];
    });
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch((prev) => {
      const next = prev.filter((id) => id !== movie.id);
      if (next.length !== prev.length) notify(`${movie.title || "Movie"} removed from Must Watch`);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      favorites,
      addToFavorites,
      removeFromFavorites,
      addReview,
      mustWatch,
      addToMustWatch,
      removeFromMustWatch,
    }),
    [favorites, mustWatch]
  );

  return <MoviesContext.Provider value={value}>{props.children}</MoviesContext.Provider>;
};

export default MoviesContextProvider;
