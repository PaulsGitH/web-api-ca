import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

const poster = (p) => p ? `https://image.tmdb.org/t/p/w342/${p}` : "";

const PersonCredits = ({ cast = [] }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {cast.map((m) => (
        <Grid key={m.credit_id || `${m.id}-${m.character}`} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card>
            <Link to={`/movies/${m.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <CardActionArea>
                <CardMedia sx={{ height: 300 }} image={poster(m.poster_path)} />
                <CardContent>
                  <Typography variant="h6" component="p">{m.title}</Typography>
                  <Typography variant="body2" component="p">
                    {m.character ? `as ${m.character}` : ""}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PersonCredits;
