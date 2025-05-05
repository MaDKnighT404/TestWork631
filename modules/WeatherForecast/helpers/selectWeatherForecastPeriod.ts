import { FORECAST_CONSTANTS } from "../constants";

import type {
  CityWeatherForecastResponse,
  WeatherForecastData,
} from "../../SearchCityForecast/types";

export const selectWeatherForecastPeriod = (
  weatherData: CityWeatherForecastResponse,
  isSingleDay: boolean
): WeatherForecastData[] => {
  if (isSingleDay) {
    // For 12 hours forecast
    return weatherData.list.slice(
      FORECAST_CONSTANTS.START_INDEX,
      FORECAST_CONSTANTS.HOURS_12_COUNT
    );
  } else {
    // For 6 days forecast
    return FORECAST_CONSTANTS.DAILY_INDICES.filter((index) => index < weatherData.list.length).map(
      (index) => weatherData.list[index]
    );
  }
};
