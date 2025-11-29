import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid";

const MovieList = ({ movies, action }) => {
  return (
    <Grid container spacing={3} alignItems="stretch">
      {movies.map((m) => (
        <Grid
          key={m.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <Movie movie={m} action={action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
