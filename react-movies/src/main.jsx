import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from "@mui/material";
import SiteHeader from "./components/siteHeader";
import ProtectedRoute from "./components/protectedRoutes";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import MoviesContextProvider from "./contexts/moviesContext";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import PopularMoviesPage from "./pages/popularMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";
import MovieSimilarPage from "./pages/movieSimilarPage";
import MovieCreditsPage from "./pages/movieCreditsPage";
import PersonDetailsPage from "./pages/personDetailsPage";
import CompanyDetailsPage from "./pages/companyDetailsPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import SearchMoviesPage from "./pages/searchMoviesPage";
import SearchActorsPage from "./pages/searchActorsPage";
import NotifyProvider from "./components/notifyProvider";
import AuthContextProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import EditMovieReviewPage from "./pages/editMovieReviewPage.jsx";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#7c3aed" },
    secondary: { main: "#22d3ee" },
    background: { default: "#0b1020", paper: "#121936" },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ["Inter", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
    h4: { fontWeight: 700 },
  },
  components: {
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 12, textTransform: "none" } } },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ a: { textDecoration: "none", color: "inherit" } }} />
        <BrowserRouter>
          <AuthContextProvider>
            <SiteHeader />
            <NotifyProvider>
              <MoviesContextProvider>
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/reviews/form" element={<ProtectedRoute> <AddMovieReviewPage /> </ProtectedRoute>} />
                  <Route path="/reviews/:id" element={<MovieReviewPage />} />
                  <Route path="/movies/favorites" element={<ProtectedRoute> <FavoriteMoviesPage /> </ProtectedRoute>} />
                  <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                  <Route path="/movies/popular" element={<PopularMoviesPage />} />
                  <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
                  <Route path="/movies/now-playing" element={<NowPlayingMoviesPage />} />
                  <Route path="/movies/:id/recommendations" element={<MovieRecommendationsPage />} />
                  <Route path="/movies/:id/credits" element={<MovieCreditsPage />} />
                  <Route path="/movies/:id/similar" element={<MovieSimilarPage />} />
                  <Route path="/person/:id" element={<PersonDetailsPage />} />
                  <Route path="/company/:id" element={<CompanyDetailsPage />} />
                  <Route path="/movies/:id" element={<MoviePage />} />
                  <Route path="/movies/mustwatch" element={<ProtectedRoute> <MustWatchMoviesPage /> </ProtectedRoute>} />
                  <Route path="/reviews/edit" element={<ProtectedRoute><EditMovieReviewPage /></ProtectedRoute>} />
                  <Route path="/movies/search" element={<SearchMoviesPage />} />
                  <Route path="/movies/actors" element={<SearchActorsPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </MoviesContextProvider>
            </NotifyProvider>
          </AuthContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
