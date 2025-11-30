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
import { excerpt } from "../../util";
import Spinner from "../spinner";
import { AuthContext } from "../../contexts/authContext";

export default function MovieReviews({ movie }) {
  const { isAuthenticated } = useContext(AuthContext);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["reviews", { id: movie.id }],
    queryFn: getMovieReviews,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const reviews = data?.results || [];

  if (reviews.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          No reviews from TMDB for this movie yet.
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
          <Typography variant="body2">
            Sign in to write a review.
          </Typography>
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
            {reviews.map((r) => (
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
