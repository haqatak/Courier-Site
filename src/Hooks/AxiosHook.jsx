import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";

// Create axios instance outside the hook (singleton)
const axiosSecure = axios.create({
  baseURL: `https://zap-server-ten.vercel.app/`,
});

const AxiosHook = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Request interceptor (for setting Authorization header)
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response interceptor (for handling unauthorized access)
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;
        if (status === 403) {
          navigate("/unauthorized");
        } else if (status === 401) {
          logOut()
            .then(() => navigate("/login"))
            .catch(() => {});
        }
        return Promise.reject(error);
      }
    );

    // 🧼 Clean up interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default AxiosHook;
