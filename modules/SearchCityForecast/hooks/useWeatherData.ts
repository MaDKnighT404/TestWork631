import { useState } from "react";

import { fetchWeatherData } from "../api/weatherApi";
import { validateCityName } from "../utils/validators";

export const useWeatherData = () => {
  const [city, setCity] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (searchCity: string) => {
    setValidationError(null);
    setError(null);
    const validation = validateCityName(searchCity);
    if (!validation.isValid) {
      setValidationError(validation.errorMessage || "Invalid city name");
      return null;
    }

    setLoading(true);

    try {
      const data = await fetchWeatherData(searchCity);
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error fetching weather data");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCity = (newCity: string) => {
    setCity(newCity);
    setValidationError(null);
  };

  return {
    city,
    setCity: updateCity,
    loading,
    error,
    validationError,
    fetchWeatherData: fetchData,
  };
};
