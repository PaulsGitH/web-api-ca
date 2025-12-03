import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieReviews } from "../../api/tmdb-api";
import { getUserMovieReviews } from "../../api/review-api";
import { excerpt } from "../../util";
import Spinner from "../spinner";
import { AuthContext } from "../../contexts/authContext";

export default function MovieReviews({ movie }) {
  const { isAuthenticated, token } = useContext(AuthContext);

  const {
    data: tmdbData,
    error: tmdbError,
    isPending: tmdbPending,
    isError: tmdbIsError,
  } = useQuery({
    queryKey: ["reviews", { id: movie.id }],
    queryFn: getMovieReviews,
  });

  const {
    data: userData,
    error: userError,
    isPending: userPending,
    isError: userIsError,
  } = useQuery({
    queryKey: ["user-reviews", { movieId: movie.id }],
    queryFn: () => getUserMovieReviews(movie.id, token),
    enabled: isAuthenticated && !!movie.id && !!token,
  });

  if (tmdbPending || (isAuthenticated && userPending)) {
    return <Spinner />;
  }

  if (tmdbIsError) {
    return <h1>{tmdbError.message}</h1>;
  }

  if (userIsError) {
    console.error(userError);
  }

  const tmdbReviews = tmdbData?.results || [];
  const userReviews = Array.isArray(userData) ? userData : [];

  const combinedReviews = [
    ...userReviews.map((r) => ({
      id: r._id,
      author: r.username,
      content: r.content,
      created_at: r.createdAt,
      author_details: { rating: r.rating ?? null },
      isUserReview: true,
    })),
    ...tmdbReviews,
  ];

  if (combinedReviews.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          No reviews for this movie yet.
        </Typography>
        {isAuthenticated ? (
          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/reviews/form"
            state={{ movieId: movie.id }}
          >
            Write a review
          </Button>
        ) : (
          <Typography variant="body2">Sign in to write a review.</Typography>
        )}
      </Paper>
    );
  }

  return (
    <Box sx={{ p: 1.5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="reviews table">
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell align="center">Excerpt</TableCell>
              <TableCell align="right">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {combinedReviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell component="th" scope="row">
                  {r.author}
                </TableCell>
                <TableCell>{excerpt(r.content)}</TableCell>
                <TableCell>
                  <Link
                    to={`/reviews/${r.id}`}
                    state={{
                      review: r,
                      movie: movie,
                    }}
                  >
                    Full Review
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isAuthenticated && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/reviews/form"
            state={{ movieId: movie.id }}
          >
            Write your own review
          </Button>
        </Box>
      )}
    </Box>
  );
}
