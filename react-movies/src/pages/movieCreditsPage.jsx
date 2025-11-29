import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMoviePage";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const Section = ({ title, children }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 3,
      bgcolor: "background.paper",
      border: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 2, opacity: 0.12 }} />
    {children}
  </Paper>
);

const PersonCard = ({ person }) => {
  const img = person.profile_path
    ? `https://image.tmdb.org/t/p/w342/${person.profile_path}`
    : "https://via.placeholder.com/342x513/2b2f3a/FFFFFF?text=No+Image";
  return (
    <Link to={`/person/${person.id}`} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          bgcolor: "background.paper",
        }}
      >
        <Box
          component="img"
          src={img}
          alt={person.name}
          sx={{ width: "100%", display: "block" }}
        />
        <Box sx={{ p: 1.25 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }} noWrap>
            {person.name}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            {person.character || person.job || "—"}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

const MovieCreditsPage = () => {
  const { id } = useParams();

  const {
    data: movie,
    error: movieError,
    isPending: moviePending,
    isError: movieIsError,
  } = useQuery({
    queryKey: ["movie", { id }],
    queryFn: getMovie,
  });

  const {
    data: credits,
    error: credError,
    isPending: credPending,
    isError: credIsError,
  } = useQuery({
    queryKey: ["credits", { id }],
    queryFn: getMovieCredits,
  });

  if (moviePending || credPending) return <Spinner />;
  if (movieIsError) return <h1>{movieError.message}</h1>;
  if (credIsError) return <h1>{credError.message}</h1>;

  const cast = credits?.cast || [];
  const crew = credits?.crew || [];

  const departments = Array.from(new Set(crew.map((m) => m.department))).sort();

  return (
    <PageTemplate movie={movie}>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <Section title="Cast">
            <Grid container spacing={2}>
              {cast.map((p) => (
                <Grid item key={`cast-${p.credit_id}`} xs={6} sm={4} md={3} lg={2.4}>
                  <PersonCard person={p} />
                </Grid>
              ))}
              {cast.length === 0 && (
                <Grid item xs={12}>
                  <Typography>No cast data available.</Typography>
                </Grid>
              )}
            </Grid>
          </Section>
        </Grid>

        <Grid item xs={12}>
          <Section title="Crew">
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {departments.map((d) => (
                <Chip key={d} label={d} />
              ))}
            </Box>
            <Grid container spacing={2}>
              {crew.map((p) => (
                <Grid item key={`crew-${p.credit_id}`} xs={6} sm={4} md={3} lg={2.4}>
                  <PersonCard person={p} />
                </Grid>
              ))}
              {crew.length === 0 && (
                <Grid item xs={12}>
                  <Typography>No crew data available.</Typography>
                </Grid>
              )}
            </Grid>
          </Section>
        </Grid>
      </Grid>
    </PageTemplate>
  );
};

export default MovieCreditsPage;
