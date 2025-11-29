import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

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

const ThumbCard = ({ img, title, sub, to }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
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
        alt={title}
        sx={{ width: "100%", display: "block" }}
      />
      <Box sx={{ p: 1.25 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }} noWrap>
          {title}
        </Typography>
        {sub && (
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            {sub}
          </Typography>
        )}
      </Box>
    </Box>
  </Link>
);

const PersonDetailsPage = () => {
  const { id } = useParams();

  const {
    data: person,
    error: pErr,
    isPending: pPend,
    isError: pIsErr,
  } = useQuery({ queryKey: ["person", { id }], queryFn: getPerson });

  const {
    data: credits,
    error: cErr,
    isPending: cPend,
    isError: cIsErr,
  } = useQuery({
    queryKey: ["person-credits", { id }],
    queryFn: getPersonMovieCredits,
  });

  if (pPend || cPend) return <Spinner />;
  if (pIsErr) return <h1>{pErr.message}</h1>;
  if (cIsErr) return <h1>{cErr.message}</h1>;

  const profile =
    person.profile_path &&
    `https://image.tmdb.org/t/p/w500/${person.profile_path}`;

  const gender =
    person.gender === 1 ? "Female" : person.gender === 2 ? "Male" : "Other";
  const popularity =
    typeof person.popularity === "number"
      ? person.popularity.toFixed(1)
      : "—";

  const cast = credits?.cast || [];
  const crew = credits?.crew || [];

  const topCast = [...cast]
    .filter((m) => m.poster_path)
    .sort((a, b) => Number(b.popularity) - Number(a.popularity))
    .slice(0, 12);

  const topCrew = [...crew]
    .filter((m) => m.poster_path)
    .sort((a, b) => Number(b.popularity) - Number(a.popularity))
    .slice(0, 12);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} lg={3}>
        <Box
          sx={{
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "background.paper",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Box
            component="img"
            src={
              profile ||
              "https://via.placeholder.com/500x750/2b2f3a/FFFFFF?text=No+Image"
            }
            alt={person.name}
            sx={{ width: "100%", display: "block" }}
          />
        </Box>

        <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip label={person.known_for_department || "—"} color="primary" />
          <Chip label={gender} />
          <Chip label={`Popularity • ${popularity}`} />
        </Box>
      </Grid>

      <Grid item xs={12} md={8} lg={9} sx={{ display: "grid", gap: 16 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: "background.paper",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {person.name}
          </Typography>

          {person.also_known_as?.length > 0 && (
            <Typography variant="body2" sx={{ opacity: 0.75, mb: 1 }}>
              Also known as: {person.also_known_as.slice(0, 3).join(", ")}
            </Typography>
          )}

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <Chip label={`Born • ${person.birthday || "—"}`} />
            {person.deathday && <Chip label={`Died • ${person.deathday}`} />}
            <Chip label={`From • ${person.place_of_birth || "—"}`} />
          </Box>

          <Typography variant="h6" sx={{ mb: 1 }}>
            Biography
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.92 }}>
            {person.biography && person.biography.trim().length > 0
              ? person.biography
              : "No biography available."}
          </Typography>
        </Paper>

        <Section title="Top cast movies">
          <Grid container spacing={2}>
            {topCast.map((m) => (
              <Grid key={`cast-${m.credit_id}`} item xs={6} sm={4} md={3} lg={2.4}>
                <ThumbCard
                  img={`https://image.tmdb.org/t/p/w342/${m.poster_path}`}
                  title={m.title || m.name}
                  sub={m.character ? `as ${m.character}` : ""}
                  to={`/movies/${m.id}`}
                />
              </Grid>
            ))}
            {topCast.length === 0 && (
              <Grid item xs={12}>
                <Typography>No cast credits.</Typography>
              </Grid>
            )}
          </Grid>
        </Section>

        <Section title="Top crew movies">
          <Grid container spacing={2}>
            {topCrew.map((m) => (
              <Grid key={`crew-${m.credit_id}`} item xs={6} sm={4} md={3} lg={2.4}>
                <ThumbCard
                  img={`https://image.tmdb.org/t/p/w342/${m.poster_path}`}
                  title={m.title || m.name}
                  sub={m.job || "Crew"}
                  to={`/movies/${m.id}`}
                />
              </Grid>
            ))}
            {topCrew.length === 0 && (
              <Grid item xs={12}>
                <Typography>No crew credits.</Typography>
              </Grid>
            )}
          </Grid>
        </Section>
      </Grid>
    </Grid>
  );
};

export default PersonDetailsPage;
