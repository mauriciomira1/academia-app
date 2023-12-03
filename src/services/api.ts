import { AppError } from "@utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type APIIntanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "http://192.168.3.2:3333",
}) as APIIntanceProps;

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
      } else {
        return Promise.reject(error);
      }
    }
  );

  return () => api.interceptors.response.eject(interceptTokenManager);
};

export { api };
