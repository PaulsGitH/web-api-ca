import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCompany, getCompanyMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MovieList from "../components/movieList";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import MustWatchToggleIcon from "../components/cardIcons/mustWatchToggle";

const CompanyDetailsPage = () => {
  const { id } = useParams();

  const {
    data: company,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["company", { id }],
    queryFn: getCompany,
  });

  const {
    data: companyMovies,
    error: moviesError,
    isPending: moviesPending,
    isError: moviesIsError,
  } = useQuery({
    queryKey: ["company-movies", { id }],
    queryFn: getCompanyMovies,
  });

  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [minRating, setMinRating] = useState("");

  if (isPending || moviesPending) return <Spinner />;
  if (isError) return <Typography variant="h5">{error.message}</Typography>;
  if (moviesIsError) return <Typography variant="h5">{moviesError.message}</Typography>;

  const movies = companyMovies?.results || [];

  const years = movies
    .map((m) => (m.release_date ? Number(m.release_date.slice(0, 4)) : null))
    .filter((y) => Number.isFinite(y));
  const minYear = years.length ? Math.min(...years) : null;
  const maxYear = years.length ? Math.max(...years) : null;
  const avgRating = movies.length
    ? (movies.reduce((s, m) => s + (Number(m.vote_average) || 0), 0) / movies.length).toFixed(1)
    : "—";

  const filteredMovies = movies.filter((m) => {
    const y = m.release_date ? Number(m.release_date.slice(0, 4)) : null;
    const r = Number(m.vote_average) || 0;
    const yf = yearFrom ? Number(yearFrom) : null;
    const yt = yearTo ? Number(yearTo) : null;
    const mr = minRating ? Number(minRating) : null;

    const inFrom = yf ? (y ? y >= yf : false) : true;
    const inTo = yt ? (y ? y <= yt : false) : true;
    const inRating = mr ? r >= mr : true;

    return inFrom && inTo && inRating;
  });

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
          {company.name}
        </Typography>
      </Grid>

      <Grid item xs={12} md={3}>
        {company.logo_path ? (
          <img
            alt={`${company.name} logo`}
            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body1">No logo available</Typography>
          </Paper>
        )}
      </Grid>

      <Grid item xs={12} md={9}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" component="p" sx={{ mb: 2 }}>
            Company Info
          </Typography>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {company.headquarters && <Chip label={`HQ: ${company.headquarters}`} />}
            {company.origin_country && <Chip label={`Country: ${company.origin_country}`} />}
            {company.parent_company?.name && <Chip label={`Parent: ${company.parent_company.name}`} />}
            {company.homepage && (
              <Button
                variant="outlined"
                size="small"
                href={company.homepage}
                target="_blank"
                rel="noreferrer"
              >
                Homepage
              </Button>
            )}
          </div>

          {company.description && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              {company.description}
            </Typography>
          )}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" component="p" sx={{ mb: 2 }}>
            Quick stats
          </Typography>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Chip label={`Movies: ${movies.length}`} />
            <Chip label={`Average rating: ${avgRating}`} />
            <Chip label={`Year range: ${minYear ?? "—"}${minYear && maxYear ? " – " : ""}${maxYear ?? ""}`} />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            Filter produced movies
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Year from"
              type="number"
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              inputProps={{ min: 1900, max: 2100, step: 1 }}
              sx={{ width: 140 }}
            />
            <TextField
              label="Year to"
              type="number"
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              inputProps={{ min: 1900, max: 2100, step: 1 }}
              sx={{ width: 140 }}
            />
            <TextField
              label="Min rating"
              type="number"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              inputProps={{ min: 0, max: 10, step: 0.1 }}
              sx={{ width: 140 }}
            />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Produced Movies
        </Typography>
        <Grid container>
          <MovieList
            movies={filteredMovies}
            action={(movie) => (
              <>
                <AddToFavoritesIcon movie={movie} />
                <MustWatchToggleIcon movie={movie} />
              </>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompanyDetailsPage;
