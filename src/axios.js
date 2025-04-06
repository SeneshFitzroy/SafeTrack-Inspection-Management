import axios from "axios";

// Create an axios instance for OpenAI API
const axiosInstance = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeout to prevent hanging requests
  timeout: 30000,
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      url: config.url,
      method: config.method,
      data: config.data ? { ...config.data, model: config.data.model } : null
    });
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("API Response Status:", response.status);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
