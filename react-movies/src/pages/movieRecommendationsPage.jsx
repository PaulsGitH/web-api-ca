import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";

const MovieRecommendationsPage = () => {
  const { id } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = Array.isArray(data) ? data : data?.results || [];

  return (
    <PageTemplate
      title="Recommendations"
      movies={movies}
      action={(movie) => (
        <>
          <AddToFavoritesIcon movie={movie} />
          <MustWatchToggleIcon movie={movie} />
        </>
      )}
    />
  );
};

export default MovieRecommendationsPage;
