// src/pages/topRatedMoviesPage.jsx
import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getTopRatedPaged } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const TopRatedMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["top_rated", { page }],
    queryFn: getTopRatedPaged,
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data?.results || [];
  const totalPages = Math.min(data?.total_pages || 1, 500);

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => (
          <>
            <AddToFavoritesIcon movie={movie} />
            <MustWatchToggleIcon movie={movie} />
          </>
        )}
      />

      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setSearchParams({ page: String(value) })}
          color="primary"
          shape="rounded"
        />
      </Box>
    </>
  );
};

export default TopRatedMoviesPage;
