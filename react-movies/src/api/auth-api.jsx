export const signUp = async ({ username, password }) => {
  const response = await fetch("http://localhost:8080/api/users?action=register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    const message = data.msg || "Signup failed";
    throw new Error(message);
  }

  return data;
};

export const login = async ({ username, password }) => {
  const response = await fetch("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok || !data.success || !data.token) {
    const message = data.msg || "Login failed";
    throw new Error(message);
  }

  return data; // contains token field: "BEARER <jwt>"
};
