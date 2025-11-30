import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";
import { AuthContext } from "../contexts/authContext";
import { useNotify } from "../components/notifyProvider";

const SignUpPage = () => {
  const { signup } = useContext(AuthContext);
  const notify = useNotify();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const validateUserName = (value) => {
    if (!value.trim()) {
      return "Username is required.";
    }
    if (value.trim().length < 3) {
      return "Username must be at least 3 characters.";
    }
    return "";
  };

  const validatePassword = (value) => {
    if (!value) {
      return "Password is required.";
    }
    if (value.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value) || !/[^\w\s]/.test(value)) {
      return "Password must include a letter, number and special character.";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const nameErr = validateUserName(userName);
    const passErr = validatePassword(password);

    setUserNameError(nameErr);
    setPasswordError(passErr);

    if (nameErr || passErr) {
      return;
    }

    setSubmitting(true);

    try {
      await signup(userName.trim(), password);
      notify("Signup successful. Please login");
      navigate("/login");
    } catch (error) {
      const message = error.message || "Signup failed";
      setFormError(message);
      notify(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sign up
        </Typography>

        {formError && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            {formError}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              if (userNameError) {
                setUserNameError("");
              }
            }}
            error={Boolean(userNameError)}
            helperText={userNameError || ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) {
                setPasswordError("");
              }
            }}
            error={Boolean(passwordError)}
            helperText={
              passwordError ||
              "At least 8 characters with a letter, number and special character"
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={submitting}
          >
            {submitting ? "Signing up..." : "Sign up"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
