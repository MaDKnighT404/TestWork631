"use client";

import { useRouter } from "next/navigation";
import { useWeatherData } from "../SearchCityForecast/hooks/useWeatherData";
import { useWeatherForecastStore } from "../WeatherForecast/store";
import { useFavoriteCitiesStore } from "./store";
import { FavoriteCity } from "./types";
import Loader from "@/shared/Loader/Loader";
import { useState } from "react";

export default function FavoriteCities() {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);
  const { favoriteCities, removeFavoriteCity } = useFavoriteCitiesStore();
  const { loading, error, fetchWeatherData } = useWeatherData();
  const { setWeatherForecastData } = useWeatherForecastStore();

  const handleRemoveFavoriteCity = (city: FavoriteCity) => {
    removeFavoriteCity(city);
  };

  const handleShowForecast = async (city: FavoriteCity) => {
    try {
      setRedirecting(true);
      const data = await fetchWeatherData(city.name);
      setWeatherForecastData(data);
      router.push(`/forecast`);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setRedirecting(false);
    }
  };

  const showLoader = loading || redirecting;

  return (
    <>
      {error && <div className="text-center">Error: {error}</div>}
      <h2 className="text-center mt-4">Your favorite cities</h2>
      <div className="position-relative">
        {showLoader && <Loader />}
        <ul className="row list-group mt-4">
          {favoriteCities.map((el) => (
            <li
              key={el.name}
              className="d-flex justify-content-between align-items-center col-6 list-group-item mx-auto"
              style={{ cursor: "pointer" }}
              onClick={() => handleShowForecast(el)}
            >
              <p>
                {el.name} {`(${el.lat} - ${el.lon})`}
              </p>
              <button
                disabled={showLoader}
                className={`btn btn-${showLoader ? "secondary" : "danger"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavoriteCity(el);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
