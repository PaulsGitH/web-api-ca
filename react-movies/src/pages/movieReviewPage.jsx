import React from "react";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

const MovieReviewPage = () => {
  const { state } = useLocation();
  const { movie, review } = state;

  const author = review?.author || "Anonymous";
  const rating =
    review?.author_details?.rating !== null &&
    review?.author_details?.rating !== undefined
      ? review.author_details.rating
      : null;
  const created =
    review?.created_at ? new Date(review.created_at).toLocaleDateString() : null;

  // link to original review on TMDB
  const reviewUrl = review?.url;

  return (
    <PageTemplate movie={movie}>
      <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
        <Paper
          elevation={0}
          sx={{
            maxWidth: 1100,
            mx: "auto",
            p: { xs: 2.5, md: 4 },
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.08)",
            bgcolor: "background.paper",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {author?.[0]?.toUpperCase() || "R"}
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  Review by {author}
                </Typography>
                {created && (
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {created}
                  </Typography>
                )}
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              {rating !== null && <Chip color="primary" label={`Rating: ${rating}/10`} />}
              {reviewUrl && (
                <Link
                  href={reviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  underline="hover"
                  sx={{ fontSize: 14 }}
                >
                  View on TMDB
                </Link>
              )}
            </Stack>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* Content */}
          <Box
            sx={{
              "& p": { mb: 2, lineHeight: 1.7 },
              "& a": { color: "primary.light" },
              fontSize: { xs: 15.5, md: 16.5 },
            }}
          >
            <MovieReview review={review} />
          </Box>
        </Paper>
      </Box>
    </PageTemplate>
  );
};

export default MovieReviewPage;
