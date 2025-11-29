import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Header = (props) => {
  const title = props.title;
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 3,
        px: 2.5,
        py: 1.25,
        mb: 2,
        background:
          "linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.9) 100%)",
        backdropFilter: "blur(6px)",
        boxShadow: (t) => t.shadows[3],
      }}
      elevation={3}
    >
      <IconButton aria-label="go back" onClick={() => navigate(-1)} sx={{ mr: 1 }}>
        <ArrowBackIcon sx={{ color: "common.white" }} fontSize="large" />
      </IconButton>

      <Typography
        variant="h4"
        component="h3"
        sx={{
          fontWeight: 700,
          letterSpacing: 0.2,
          textAlign: "center",
          flex: 1,
          color: "common.white",
          px: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={title}
      >
        {title}
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(1)} sx={{ ml: 1 }}>
        <ArrowForwardIcon sx={{ color: "common.white" }} fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
