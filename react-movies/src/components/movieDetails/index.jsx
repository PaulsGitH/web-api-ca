import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";

import MovieReviews from "../movieReviews";
import img from "../../images/film-poster-placeholder.png";

const root = { display: "flex", flexWrap: "wrap", gap: 0.75, p: 1.5, m: 0 };
const chip = { m: 0.5 };

const MovieDetails = ({ movie }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780/${movie.poster_path}`
    : img;

  const cert = useMemo(() => {
    const sets = movie.release_dates?.results || [];
    const pick = sets.find(
      (r) => ["IE", "GB", "US"].includes(r.iso_3166_1)
    );
    const entry = pick?.release_dates?.find((d) => d.certification);
    return entry?.certification || null;
  }, [movie]);

  const trailerKey = useMemo(() => {
    const vids = movie.videos?.results || [];
    const first = vids.find(
      (v) => v.site === "YouTube" && v.type === "Trailer" && v.key
    );
    return first?.key || null;
  }, [movie]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              position: { md: "sticky" },
              top: { md: 24 },
            }}
          >
            <CardMedia
              component="img"
              image={posterSrc}
              alt={movie.title}
              sx={{ display: "block", width: "100%", height: "auto" }}
            />
          </Card>

          <Paper sx={{ mt: 2, borderRadius: 3 }}>
            <Box sx={root}>
              <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
              <Chip
                icon={<MonetizationIcon />}
                label={`${(movie.revenue || 0).toLocaleString()}`}
              />
              <Chip
                icon={<StarRate />}
                label={`${movie.vote_average} (${movie.vote_count})`}
              />
              <Chip label={`Released: ${movie.release_date || "—"}`} />
              {cert && <Chip label={`Cert: ${cert}`} color="default" />}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          {movie.tagline ? (
            <Typography
              variant="subtitle1"
              sx={{ fontStyle: "italic", opacity: 0.9, mb: 1 }}
            >
              {movie.tagline}
            </Typography>
          ) : null}

          <Paper sx={{ borderRadius: 3, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1.25 }}>
              Overview
            </Typography>
            <Typography variant="body1">{movie.overview}</Typography>
          </Paper>

          <Paper sx={{ borderRadius: 3, mt: 2 }}>
            <Box sx={root}>
              <Chip label="Genres" color="primary" sx={chip} />
              {(movie.genres || []).map((g) => (
                <Chip key={g.id || g.name} label={g.name} sx={chip} />
              ))}
            </Box>
            <Divider />
            <Box sx={root}>
              <Chip label="Production Companies" color="primary" sx={chip} />
              {(movie.production_companies || []).map((c) => (
                <Link
                  key={c.id}
                  to={`/company/${c.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Chip label={c.name} sx={chip} />
                </Link>
              ))}
            </Box>
            <Divider />
            <Box sx={root}>
              <Chip label="Spoken Languages" color="primary" sx={chip} />
              {(movie.spoken_languages || []).map((l) => (
                <Chip
                  key={l.iso_639_1 || l.name}
                  label={l.english_name || l.name}
                  sx={chip}
                />
              ))}
            </Box>
            <Divider />
            <Box sx={root}>
              <Chip label="Production Countries" color="primary" sx={chip} />
              {(movie.production_countries || []).map((c) => (
                <Chip key={c.iso_3166_1 || c.name} label={c.name} sx={chip} />
              ))}
            </Box>
          </Paper>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Link to={`/movies/${movie.id}/recommendations`}>
              <Button variant="outlined" size="small">Recommendations</Button>
            </Link>
            <Link to={`/movies/${movie.id}/similar`}>
              <Button variant="outlined" size="small">Similar</Button>
            </Link>
            <Link to={`/movies/${movie.id}/credits`}>
              <Button variant="outlined" size="small">Cast & Crew</Button>
            </Link>
            {trailerKey ? (
              <a
                href={`https://www.youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="contained" size="small">Watch Trailer</Button>
              </a>
            ) : null}
            {movie.homepage ? (
              <a href={movie.homepage} target="_blank" rel="noreferrer">
                <Button variant="text" size="small">Homepage</Button>
              </a>
            ) : null}
            {movie.external_ids?.imdb_id ? (
              <a
                href={`https://www.imdb.com/title/${movie.external_ids.imdb_id}/`}
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="text" size="small">IMDb</Button>
              </a>
            ) : null}
          </Box>

          {(movie.keywords?.keywords?.length || 0) > 0 ? (
            <Paper sx={{ borderRadius: 3, mt: 2 }}>
              <Box sx={root}>
                <Chip label="Keywords" color="primary" sx={chip} />
                {movie.keywords.keywords.map((k) => (
                  <Chip key={k.id} label={k.name} sx={chip} />
                ))}
              </Box>
            </Paper>
          ) : null}
        </Grid>
      </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;
