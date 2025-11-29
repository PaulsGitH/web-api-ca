import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router";

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
        padding: 1.5,
        margin: 0,
      }}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h3"
          sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center", flexWrap: "wrap" }}
        >
          {movie.title}
          {movie.homepage && (
            <IconButton
              component="a"
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="movie homepage"
              size="small"
              sx={{ ml: 0.5, p: 0.25 }}
            >
              <HomeIcon color="primary" fontSize="inherit" />
            </IconButton>
          )}
        </Typography>

        {movie.tagline && (
          <Typography
            variant="subtitle1"
            component="p"
            sx={{ fontStyle: "italic", opacity: 0.8, mt: 0.5 }}
          >
            {`"${movie.tagline}"`}
          </Typography>
        )}
      </div>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
