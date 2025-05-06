"use client";

import React from "react";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";

import { useWeatherForecastStore } from "./store";
import { useFavoriteCitiesStore } from "../FavoriteCities/store";
import { selectWeatherForecastPeriod } from "./helpers/selectWeatherForecastPeriod";

export default function WeatherForecast({ singleDay = false }: { singleDay?: boolean }) {
  const pathname = usePathname();
  const { weatherForecastData } = useWeatherForecastStore();
  const { favoriteCities, addFavoriteCity, removeFavoriteCity } = useFavoriteCitiesStore();

  if (!weatherForecastData && pathname === "/forecast") {
    redirect("/");
  }
  if (!weatherForecastData) return null;

  const filteredWeatherForecast = selectWeatherForecastPeriod(weatherForecastData, singleDay);
  const title = singleDay
    ? "Weather forecast by locations for next 12 hours"
    : "Weather forecast by locations for 5 days";

  const isFavoriteCity = favoriteCities.some((city) => city.name === weatherForecastData.city.name);

  const handleChangeFavoriteCity = () => {
    if (isFavoriteCity) {
      removeFavoriteCity({
        name: weatherForecastData.city.name,
        lat: weatherForecastData.city.coord.lat,
        lon: weatherForecastData.city.coord.lon,
      });
    } else {
      addFavoriteCity({
        name: weatherForecastData.city.name,
        lat: weatherForecastData.city.coord.lat,
        lon: weatherForecastData.city.coord.lon,
      });
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center">{title}</h2>
      <div className="d-flex mt-5 align-items-center gap-3">
        <h3 className="mb-0">
          {weatherForecastData.city.name}, {weatherForecastData.city.country}
        </h3>
        <button
          className={`btn btn-${isFavoriteCity ? "danger " : "primary"} `}
          onClick={handleChangeFavoriteCity}
        >
          {isFavoriteCity ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>
      <ul className="row mt-4 d-flex justify-content-center">
        {filteredWeatherForecast.map((item, index) => (
          <li key={index} className="col-12 col-sm-5 col-lg mb-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">
                  {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "UTC",
                  })}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    timeZone: "UTC",
                  })}
                </h6>
                <div className="weather-icon">
                  <Image
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                    className="img-fluid"
                    width={100}
                    height={100}
                  />
                </div>
                <p className="temperature">{Math.round(item.main.temp - 273.15)}°C</p>
                <p className="description">{item.weather[0].description}</p>
                <div className="weather-details">
                  <div className="detail">
                    <span>Feels like: {Math.round(item.main.feels_like - 273.15)}°C</span>
                  </div>
                  <div className="detail">
                    <span>Humidity: {item.main.humidity}%</span>
                  </div>
                  <div className="detail">
                    <span>Wind: {Math.round(item.wind.speed)} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
