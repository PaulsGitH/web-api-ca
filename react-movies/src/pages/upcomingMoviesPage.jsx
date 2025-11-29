import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import { getUpcomingMoviesPaged } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router";

const UpcomingMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming", { page }],
    queryFn: getUpcomingMoviesPaged,
    keepPreviousData: true,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = Array.isArray(data?.results) ? data.results : [];
  const totalPages = Math.min(Number(data?.total_pages || 1), 500);

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
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

export default UpcomingMoviesPage;
