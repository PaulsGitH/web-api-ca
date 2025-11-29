import React, { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";

import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";
import { getSearchPerson } from "../api/tmdb-api";

const MIN_LEN = 2;
const DEBOUNCE_MS = 400;

function extractMovies(results) {
  const raw = (results || []).flatMap((p) =>
    Array.isArray(p.known_for) ? p.known_for : []
  );
  const filtered = raw.filter(
    (m) => m && m.id && (m.media_type === "movie" || m.title) && m.poster_path
  );
  const seen = new Set();
  return filtered.filter((m) => {
    if (seen.has(m.id)) return false;
    seen.add(m.id);
    return true;
  });
}

const SearchActorsPage = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const hasShownOnceRef = useRef(false);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [query]);

  const { data, error, isError, isPending, isFetching } = useQuery({
    queryKey: ["searchPerson", { query: debouncedQuery }],
    queryFn: getSearchPerson,
    enabled: debouncedQuery.length >= MIN_LEN,
  });

  const movies = useMemo(() => extractMovies(data?.results), [data?.results]);

  useEffect(() => {
    if (movies.length > 0) hasShownOnceRef.current = true;
  }, [movies.length]);

  const showInitialSpinner =
    isPending && debouncedQuery.length >= MIN_LEN && !hasShownOnceRef.current;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Search by Actor
      </Typography>

      <TextField
        fullWidth
        label="Enter actor name"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isError && <Typography variant="h6">{error.message}</Typography>}
      {showInitialSpinner && <Spinner />}

      {debouncedQuery.length >= MIN_LEN && movies.length > 0 && (
        <PageTemplate
          title={`Results for "${debouncedQuery}"`}
          movies={movies}
          action={(movie) => (
            <>
              <AddToFavoritesIcon movie={movie} />
              <MustWatchToggleIcon movie={movie} />
            </>
          )}
        />
      )}

      {debouncedQuery.length >= MIN_LEN && !isFetching && movies.length === 0 && (
        <Typography sx={{ mt: 2 }}>No valid movie results found.</Typography>
      )}
    </Box>
  );
};

export default SearchActorsPage;
