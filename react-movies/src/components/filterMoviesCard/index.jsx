import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { getGenres, getLanguages } from "../../api/tmdb-api";

const formControl = {
  margin: 1,
  minWidth: "90%",
};

export default function FilterMoviesCard(props) {
  const { data: genresData, error: gErr, isPending: gPend, isError: gIsErr } =
    useQuery({ queryKey: ["genres"], queryFn: getGenres });

  const { data: langsData, error: lErr, isPending: lPend, isError: lIsErr } =
    useQuery({ queryKey: ["languages"], queryFn: getLanguages });

  if (gPend || lPend) return <Spinner />;
  if (gIsErr) return <h1>{gErr.message}</h1>;
  if (lIsErr) return <h1>{lErr.message}</h1>;

  const genres = genresData.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }
  const languages = [{ iso_639_1: "all", english_name: "All" }, ...langsData];

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e) => handleChange(e, "name", e.target.value);
  const handleGenreChange = (e) => handleChange(e, "genre", e.target.value);
  const handleYearChange = (e) => handleChange(e, "year", e.target.value);
  const handleRatingChange = (e) => handleChange(e, "rating", e.target.value);
  const handleLanguageChange = (e) => handleChange(e, "language", e.target.value);
  const handleVotesChange = (e) => handleChange(e, "votes", e.target.value);
  const handleSortChange = (e) => handleChange(e, "sort", e.target.value);

  return (
    <Card
      sx={{
        bgcolor: "rgba(15,23,42,0.85)",
        color: "common.white",
        borderRadius: 3,
        overflow: "hidden",
        borderColor: "rgba(148,163,184,0.2)",
        borderWidth: 1,
        borderStyle: "solid",
      }}
      variant="outlined"
    >
      <CardContent sx={{ pb: 1.5 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <SearchIcon />
          Filter movies
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TextField
            sx={{
              ...formControl,
              width: "100%",
              "& .MuiFilledInput-root": {
                bgcolor: "rgba(255,255,255,0.06)",
                color: "common.white",
              },
              "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.8)" },
            }}
            id="filled-search"
            label="Search by title"
            type="search"
            variant="filled"
            value={props.titleFilter}
            onChange={handleTextChange}
          />
        </Box>

        <FormControl
          sx={{
            ...formControl,
            width: "100%",
            "& .MuiFilledInput-root": {
              bgcolor: "rgba(255,255,255,0.06)",
              color: "common.white",
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.8)" },
          }}
          variant="filled"
        >
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
            sx={{ color: "common.white" }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{
            ...formControl,
            width: "100%",
            "& .MuiFilledInput-root": {
              bgcolor: "rgba(255,255,255,0.06)",
              color: "common.white",
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.8)" },
          }}
          id="filter-year"
          label="Release year"
          type="number"
          variant="filled"
          value={props.yearFilter}
          onChange={handleYearChange}
          inputProps={{ min: 1900, max: 2100, step: 1 }}
        />

        <TextField
          sx={{
            ...formControl,
            width: "100%",
            "& .MuiFilledInput-root": {
              bgcolor: "rgba(255,255,255,0.06)",
              color: "common.white",
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.8)" },
          }}
          id="filter-rating"
          label="Minimum rating"
          type="number"
          variant="filled"
          value={props.ratingFilter}
          onChange={handleRatingChange}
          inputProps={{ min: 0, max: 10, step: 0.1 }}
        />

        <FormControl
          sx={{
            ...formControl,
            width: "100%",
            "& .MuiFilledInput-root": {
              bgcolor: "rgba(255,255,255,0.06)",
              color: "common.white",
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.8)" },
          }}
          variant="filled"
        >
          <InputLabel id="language-label">Original language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            value={props.languageFilter}
            onChange={handleLanguageChange}
            sx={{ color: "common.white" }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
                {lang.english_name || lang.name || lang.iso_639_1.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{
            ...formControl,
            width: "100%",
            "& .MuiFilledInput-root": {
              bgcolor: "rgba(255,255,255,0.06)",
              color: "common.white",
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.8)" },
          }}
          id="filter-votes"
          label="Minimum vote count"
          type="number"
          variant="filled"
          value={props.voteCountFilter}
          onChange={handleVotesChange}
          inputProps={{ min: 0, step: 10 }}
        />

        <FormControl
          sx={{
            ...formControl,
            width: "100%",
            "& .MuiFilledInput-root": {
              bgcolor: "rgba(255,255,255,0.06)",
              color: "common.white",
            },
            "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.8)" },
          }}
          variant="filled"
        >
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={props.sortOption}
            onChange={handleSortChange}
            sx={{ color: "common.white" }}
          >
            <MenuItem value="title-asc">Title A→Z</MenuItem>
            <MenuItem value="title-desc">Title Z→A</MenuItem>
            <MenuItem value="date-newest">Release date: Newest</MenuItem>
            <MenuItem value="date-oldest">Release date: Oldest</MenuItem>
            <MenuItem value="rating-high">Rating: High to Low</MenuItem>
            <MenuItem value="rating-low">Rating: Low to High</MenuItem>
            <MenuItem value="popularity-high">Popularity: High to Low</MenuItem>
            <MenuItem value="popularity-low">Popularity: Low to High</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
