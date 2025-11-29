import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router";
import img from "../../images/film-poster-placeholder.png";
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);

  const isFav = favorites.includes(movie.id);
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : img;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <CardHeader
        avatar={
          isFav ? (
            <Avatar sx={{ bgcolor: "error.main" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography
            variant="h6"
            component="p"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.2,
              fontWeight: 600,
              color: "common.white",
              paddingLeft: 0.5,
              wordBreak: "break-word",
            }}
          >
            {movie.title}
          </Typography>
        }
        sx={{
          px: 2.5,
          py: 1.25,
          bgcolor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
          "& .MuiCardHeader-content": { minWidth: 0 },
        }}
      />

      <CardMedia
        sx={{
          height: 420,
          backgroundSize: "cover",
        }}
        image={poster}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              component="p"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <CalendarIcon fontSize="small" />
              {movie.release_date || "—"}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body2"
              component="p"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                justifyContent: "flex-end",
              }}
            >
              <StarRateIcon fontSize="small" />
              {typeof movie.vote_average === "number"
                ? movie.vote_average.toFixed(1)
                : "—"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{
          mt: "auto",
          pl: 0.9,
          pr: 2.2,
          pb: 2.4,
          pt: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        {action(movie)}
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button variant="outlined" size="small" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
