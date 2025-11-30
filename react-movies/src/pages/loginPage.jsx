import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Container, Box, TextField, Button, Typography, Paper } from "@mui/material";
import { AuthContext } from "../contexts/authContext";
import { useNotify } from "../components/notifyProvider";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const notify = useNotify();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userName.trim() || !password.trim()) {
      setFormError("Username and password are required.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      await login(userName.trim(), password);
      notify("Login successful");
      navigate("/");
    } catch (error) {
      const message = error.message || "Login failed";
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
          Login
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
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

