import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9c27b0" },        
    secondary: { main: "#ffb300" },     
    background: {
      default: "#0e0f13",
      paper: "#151821",
    },
    text: {
      primary: "#E5E7EB",
      secondary: "#9CA3AF",
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: ["Roboto", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"].join(","),
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(1200px 600px at 20% -10%, rgba(156,39,176,0.12), transparent 60%), radial-gradient(1200px 600px at 120% 110%, rgba(255,179,0,0.08), transparent 60%), #0e0f13",
        },
        "*::-webkit-scrollbar": { height: 10, width: 10 },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,0.15)",
          borderRadius: 10,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid #282c34",
          background:
            "linear-gradient(90deg, rgba(21,24,33,0.95) 0%, rgba(21,24,33,0.90) 60%, rgba(21,24,33,0.85) 100%)",
          backdropFilter: "blur(6px)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: { root: { backgroundImage: "none" } },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.06)",
          transition: "transform 0.18s ease, box-shadow 0.18s ease",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 10px 26px rgba(156,39,176,0.28)",
          },
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: { padding: "10px 16px 8px" },
        title: {
          fontWeight: 600,
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        },
      },
    },

    MuiTextField: {
      defaultProps: { variant: "filled", size: "small" },
    },
    MuiSelect: {
      defaultProps: { variant: "filled", size: "small" },
    },

    MuiButton: {
      defaultProps: { variant: "contained" },
      styleOverrides: {
        root: { borderRadius: 12 },
        containedPrimary: { boxShadow: "none" },
      },
    },

    MuiChip: {
      styleOverrides: { root: { borderRadius: 10 } },
    },
  },
});

export default theme;
