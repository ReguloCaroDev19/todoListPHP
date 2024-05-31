import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Añadir el JWT a las cabeceras de autorización
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
