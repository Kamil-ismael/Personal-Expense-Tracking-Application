const API_BASE_URL = "http://localhost:8080/api";

const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

const setAuthToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

const removeAuthToken = () => {
  localStorage.removeItem("auth_token");
};

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(errorData.error || "HTTP ${response.status}");
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

const apiFormRequest = async (
  endpoint: string,
  formData: FormData,
  method = "POST"
) => {
  const token = getAuthToken();
  const config: RequestInit = {
    method,
    body: formData,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ error: "Request failed " }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }
  return response.json();
};

export { getAuthToken, setAuthToken, removeAuthToken, apiRequest, apiFormRequest, API_BASE_URL };