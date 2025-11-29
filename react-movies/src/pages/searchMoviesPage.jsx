import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { getSearchMovies } from "../api/tmdb-api";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";
import { useSearchParams } from "react-router";

const MIN_LEN = 2;

const SearchMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    const query = q.trim();
    if (query.length >= MIN_LEN) setSearchParams({ q: query });
    else setSearchParams({});
  }, [q, setSearchParams]);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { q }],
    queryFn: getSearchMovies,
    enabled: q.trim().length >= MIN_LEN,
    placeholderData: { results: [] },
    retry: false,
  });

  const movies = (data && data.results) || [];
  const shortQuery = q.trim().length < MIN_LEN;

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 3 }, pt: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Search Movies
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter movie title"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          variant="outlined"
        />
      </Box>

      {shortQuery ? (
        <Typography align="center" sx={{ mt: 6, opacity: 0.8 }}>
          Start typing to see results.
        </Typography>
      ) : isPending ? (
        <Spinner />
      ) : isError ? (
        <h1>{error.message}</h1>
      ) : (
        <PageTemplate
          title="Search Results"
          movies={movies}
          action={(movie) => (
            <>
              <AddToFavoritesIcon movie={movie} />
              <MustWatchToggleIcon movie={movie} />
            </>
          )}
        />
      )}
    </>
  );
};

export default SearchMoviesPage;
