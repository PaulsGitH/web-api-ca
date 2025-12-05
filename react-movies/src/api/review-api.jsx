const API_BASE = "http://localhost:8080/api/reviews";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not authenticated. Please login to manage reviews.");
  }
  return { Authorization: token };
};

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.msg || data.error || "Request to Reviews API failed";
    throw new Error(message);
  }

  return data;
};

// GET reviews for the logged-in user
export const getMyReviews = async () => {
  const headers = {
    ...getAuthHeader(),
  };

  const response = await fetch(API_BASE, {
    method: "GET",
    headers,
  });

  return handleResponse(response);
};

// GET this user's reviews for a specific movie
export const getMyReviewsForMovie = async (movieId) => {
  if (!movieId) {
    throw new Error("movieId is required to fetch reviews for a movie.");
  }

  const headers = {
    ...getAuthHeader(),
  };

  const response = await fetch(`${API_BASE}/movie/${movieId}`, {
    method: "GET",
    headers,
  });

  return handleResponse(response);
};

// POST create a new review for this user
export const createUserReview = async ({ movieId, rating, content }) => {
  if (!movieId || rating === undefined || !content) {
    throw new Error("movieId, rating and content are required to create a review.");
  }

  const headers = {
    "Content-Type": "application/json",
    ...getAuthHeader(),
  };

  const response = await fetch(API_BASE, {
    method: "POST",
    headers,
    body: JSON.stringify({ movieId, rating, content }),
  });

  return handleResponse(response);
};

// DELETE delete this user's review
export const deleteUserReview = async (id) => {
  if (!id) {
    throw new Error("id is required to delete a review.");
  }

  const headers = {
    ...getAuthHeader(),        // adds Authorization: BEARER <token>
    "Content-Type": "application/json",
  };

  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers,
  });

  return handleResponse(response);
};



//display user review

export const getUserMovieReviews = async (movieId, token) => {
  if (!token) {
    return []; // not logged in, no user reviews to fetch
  }

  const response = await fetch(
    `http://localhost:8080/api/reviews/movie/${movieId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    // backend will send 401/403 if token is invalid
    const error = await response.json().catch(() => ({}));
    throw new Error(error.msg || "Failed to load user reviews");
  }

  return response.json();
};

export const updateUserReview = async (id, updatedReview, token) => {
  const response = await fetch(
    `http://localhost:8080/api/reviews/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(updatedReview),
    }
  );

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || data.success === false) {
    const message = data.msg || "Failed to update review";
    throw new Error(message);
  }

  return data;
};

