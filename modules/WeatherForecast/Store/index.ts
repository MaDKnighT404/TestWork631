import { create } from "zustand";

import type { CityWeatherForecastResponse } from "../../SearchCityForecast/types";

type WeatherForecastState = {
  weatherForecastData: CityWeatherForecastResponse | null;
  setWeatherForecastData: (data: CityWeatherForecastResponse | null) => void;
};

export const useWeatherForecastStore = create<WeatherForecastState>((set) => ({
  weatherForecastData: null,
  setWeatherForecastData: (data) => set({ weatherForecastData: data }),
}));
