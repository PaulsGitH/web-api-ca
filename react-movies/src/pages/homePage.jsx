import React, { useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../api/tmdb-api";

const HomePage = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const goSearch = () => {
    const s = q.trim();
    if (s.length >= 2) navigate(`/movies/search?q=${encodeURIComponent(s)}`);
  };

  const { data } = useQuery({
    queryKey: ["upcoming-home-strip"],
    queryFn: getUpcomingMovies,
    staleTime: 360000,
    refetchOnWindowFocus: false,
  });

  const posters = (data?.results || [])
    .filter((m) => m.poster_path)
    .slice(0, 24)
    .map((m) => `https://image.tmdb.org/t/p/w342${m.poster_path}`);

  const JumpTile = ({ title, subtitle, to }) => (
    <Paper
      onClick={() => navigate(to)}
      sx={{
        p: 3,
        height: "100%",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.08)",
        bgcolor: "background.paper",
        transition: "transform 150ms ease, box-shadow 150ms ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 6 },
      }}
      elevation={0}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.85 }}>
        {subtitle}
      </Typography>
    </Paper>
  );

  const PosterRow = ({ top, height, duration, reverse }) => (
    <Box
      sx={{
        position: "absolute",
        left: "-25%",
        right: "-25%",
        top,
        display: "flex",
        gap: 20,
        opacity: 0.16,
        animation: `${reverse ? "scrollRight" : "scrollLeft"} ${duration}s linear infinite`,
      }}
    >
      {[...posters, ...posters, ...posters].map((src, i) => (
        <Box
          key={`${top}-${i}`}
          component="img"
          src={src}
          alt=""
          sx={{
            height,
            width: "auto",
            borderRadius: 2,
            boxShadow: 3,
            flex: "0 0 auto",
            filter: "saturate(0.9) blur(0.2px)",
          }}
        />
      ))}
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(1200px 600px at 20% -10%, rgba(124,58,237,0.25) 0%, rgba(34,211,238,0.15) 35%, rgba(11,16,32,0) 70%), linear-gradient(180deg, #0b1020 0%, #121936 100%)",
        position: "relative",
        overflow: "hidden",
        "@keyframes scrollLeft": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "@keyframes scrollRight": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      }}
    >
      {posters.length > 0 && (
        <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <PosterRow top="8%" height={180} duration={55} reverse />
          <PosterRow top="28%" height={210} duration={65} />
          <PosterRow top="50%" height={190} duration={58} reverse />
          <PosterRow top="72%" height={175} duration={62} />
        </Box>
      )}

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, position: "relative" }}>
        <Stack spacing={3} sx={{ textAlign: "center", mb: 5 }}>
            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1 }}>
              Find your next movie
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Browse popular, top rated, new releases, or search the TMDB catalogue.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              <TextField
                variant="outlined"
                placeholder="Search TMDB (min 2 characters)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goSearch();
                }}
                sx={{
                  width: { xs: "100%", sm: 520 },
                  bgcolor: "rgba(255,255,255,0.06)",
                  input: { color: "common.white" },
                }}
              />
              <Button size="large" variant="contained" onClick={goSearch}>
                Search
              </Button>
            </Stack>
        </Stack>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <JumpTile title="Popular" subtitle="Trending with audiences" to="/movies/popular" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <JumpTile title="Top Rated" subtitle="Highest rated titles" to="/movies/top_rated" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <JumpTile title="Now Playing" subtitle="In cinemas currently" to="/movies/now-playing" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <JumpTile title="Upcoming" subtitle="Coming soon" to="/movies/upcoming" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <JumpTile title="Favorites" subtitle="Your saved picks" to="/movies/favorites" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <JumpTile title="Must Watch" subtitle="Your watchlist" to="/movies/mustwatch" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
