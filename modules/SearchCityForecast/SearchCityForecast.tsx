"use client";

import { useWeatherForecastStore } from "../WeatherForecast/store";
import { useWeatherData } from "./hooks/useWeatherData";

export default function SearchCityForecast() {
  const { city, setCity, loading, error, validationError, fetchWeatherData } = useWeatherData();
  const { setWeatherForecastData } = useWeatherForecastStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWeatherForecastData(null);
    const data = await fetchWeatherData(city);
    setWeatherForecastData(data);
  };

  return (
    <>
      <form className="d-flex gap-4" role="search" onSubmit={handleSubmit}>
        <input
          className={`form-control ${validationError ? "is-invalid" : ""}`}
          type="search"
          placeholder="Enter city name"
          aria-label="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div
            className="spinner-border text-success"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      )}

      {validationError && (
        <div className="alert alert-warning mt-2" role="alert">
          {validationError}
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-2" role="alert">
          {error}
        </div>
      )}
    </>
  );
}
