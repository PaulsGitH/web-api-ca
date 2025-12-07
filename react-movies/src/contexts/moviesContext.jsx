import React, { useState, useMemo } from "react";
import { useNotify } from "../components/notifyProvider";

export const MoviesContext = React.createContext(null);

const STORAGE_KEYS = {
  favorites: "movies.favorites",
  mustWatch: "movies.mustWatch",
};

const safeLoadArray = (key) => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const MoviesContextProvider = (props) => {
  const notify = typeof useNotify === "function" ? useNotify() : () => {};

  const [favorites, setFavorites] = useState(() =>
    safeLoadArray(STORAGE_KEYS.favorites)
  );
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState(() =>
    safeLoadArray(STORAGE_KEYS.mustWatch)
  );

  const persistArray = (key, value) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
  };

  const addToFavorites = (movie) => {
    setFavorites((prev) => {
      if (prev.includes(movie.id)) return prev;
      const next = [...prev, movie.id];
      persistArray(STORAGE_KEYS.favorites, next);
      notify(`${movie.title || "Movie"} added to favorites`);
      return next;
    });
  };

  const removeFromFavorites = (movie) => {
    setFavorites((prev) => {
      const next = prev.filter((mId) => mId !== movie.id);
      if (next.length !== prev.length) {
        persistArray(STORAGE_KEYS.favorites, next);
        notify(`${movie.title || "Movie"} removed from favorites`);
      }
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
      const next = [...prev, movie.id];
      persistArray(STORAGE_KEYS.mustWatch, next);
      notify(`${movie.title || "Movie"} added to Must Watch`);
      return next;
    });
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch((prev) => {
      const next = prev.filter((id) => id !== movie.id);
      if (next.length !== prev.length) {
        persistArray(STORAGE_KEYS.mustWatch, next);
        notify(`${movie.title || "Movie"} removed from Must Watch`);
      }
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

  return (
    <MoviesContext.Provider value={value}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
