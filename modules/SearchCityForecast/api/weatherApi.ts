import { axiosInstance } from "@/shared/axios";

import type { CityWeatherForecastResponse } from "../types";

export const fetchWeatherData = async (
  searchCity: string
): Promise<CityWeatherForecastResponse | null> => {
  if (!searchCity.trim()) return null;

  try {
    const response = await axiosInstance.get<CityWeatherForecastResponse>(
      `/api/city_weather?city=${encodeURIComponent(searchCity)}`
    );
    return response.data;
  } catch (error) {
    throw new Error(axiosInstance.extractErrorMessage(error));
  }
};
