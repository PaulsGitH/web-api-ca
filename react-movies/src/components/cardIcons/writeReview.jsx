import React, { useContext } from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/authContext";

const WriteReviewIcon = ({ movie }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Link
      to="/reviews/form"
      state={{
        movieId: movie.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;

