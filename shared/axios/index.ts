import axios from "axios";
import { AxiosInstance } from "axios";

interface ExtendedAxiosInstance extends AxiosInstance {
  isAxiosError: typeof axios.isAxiosError;
  extractErrorMessage: (error: unknown) => string;
}

export const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
}) as ExtendedAxiosInstance;

axiosInstance.isAxiosError = axios.isAxiosError;
axiosInstance.extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.data.error || "Request error";
  }
  return "Error fetching data";
};
