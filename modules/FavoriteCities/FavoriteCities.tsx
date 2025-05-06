"use client";
import { redirect } from "next/navigation";

import Loader from "@/shared/Loader/Loader";

import { useWeatherData } from "../SearchCityForecast/hooks/useWeatherData";
import { useFavoriteCitiesStore } from "./store";
import { useWeatherForecastStore } from "../WeatherForecast/store";

import type { FavoriteCity } from "./types";
import Link from "next/link";

export default function FavoriteCities() {
  const { favoriteCities, removeFavoriteCity } = useFavoriteCitiesStore();
  const { loading, error, fetchWeatherData } = useWeatherData();
  const { setWeatherForecastData } = useWeatherForecastStore();

  const handleRemoveFavoriteCity = (city: FavoriteCity) => {
    removeFavoriteCity(city);
  };

  const handleShowForecast = async (city: FavoriteCity) => {
    const data = await fetchWeatherData(city.name);
    setWeatherForecastData(data);
    redirect(`/forecast`);
  };

  if (favoriteCities.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>You have no favorite cities yet</h2>
        <Link className="btn btn-primary mt-3" href="/">
          Try to add some
        </Link>
      </div>
    );
  }

  return (
    <>
      {error && <div className="text-center">Error: {error}</div>}
      <h2 className="text-center mt-4">Your favorite cities</h2>
      <div className="position-relative">
        {loading && <Loader />}
        <ul className="list-group mt-4 container mx-auto px-4">
          {favoriteCities.map((el) => (
            <li
              key={el.name}
              className="d-flex justify-content-between align-items-center  col-12 col-xl-8 list-group-item mx-auto"
              style={{ cursor: "pointer" }}
              onClick={() => handleShowForecast(el)}
            >
              <p>
                {el.name} {`(${el.lat} - ${el.lon})`}
              </p>
              <button
                disabled={loading}
                className={`btn btn-${loading ? "secondary" : "danger"}`}
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
