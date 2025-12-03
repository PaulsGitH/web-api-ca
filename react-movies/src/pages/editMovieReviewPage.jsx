import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../contexts/authContext";
import { updateUserReview } from "../api/review-api";

const EditMovieReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const { review } = location.state;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      content: review.content,
      rating: review.rating,
    },
  });

  const onSubmit = async (formValues) => {
      await updateUserReview(review._id, formValues, token);
      navigate(-1);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Edit Your Review
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Rating" fullWidth sx={{ mb: 2 }} />
          )}
        />

        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Review Text"
              fullWidth
              multiline
              minRows={4}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      </form>
    </Paper>
  );
};

export default EditMovieReviewPage;
