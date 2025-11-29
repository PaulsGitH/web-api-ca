import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MoviesContext } from "../../contexts/moviesContext";

const MustWatchToggleIcon = ({ movie }) => {
  const { mustWatch, addToMustWatch, removeFromMustWatch } = useContext(MoviesContext);
  const isSelected = mustWatch.includes(movie.id);

  const handleClick = (e) => {
    e.preventDefault();
    if (isSelected) removeFromMustWatch(movie);
    else addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="toggle must watch" onClick={handleClick}>
      {isSelected ? (
        <PlaylistRemoveIcon color="primary" fontSize="large" />
      ) : (
        <PlaylistAddIcon color="primary" fontSize="large" />
      )}
    </IconButton>
  );
};

export default MustWatchToggleIcon;
