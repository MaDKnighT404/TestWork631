"use client";

import React from "react";
import Image from "next/image";

import { useWeatherForecastStore } from "./Store";

import { selectWeatherForecastPeriod } from "./helpers/selectWeatherForecastPeriod";

export default function WeatherForecast({ singleDay = false }: { singleDay?: boolean }) {
  const { weatherForecastData } = useWeatherForecastStore();
  if (!weatherForecastData) return null;

  const filteredWeatherForecast = selectWeatherForecastPeriod(weatherForecastData, singleDay);
  const title = singleDay
    ? "Weather forecast by locations for next 9 hours"
    : "Weather forecast by locations for 5 days";

  return (
    <div className="mt-4">
      <h2 className="text-center">{title}</h2>
      <h3 className="mt-5">
        {weatherForecastData.city.name}, {weatherForecastData.city.country}
      </h3>
      <div className="row mt-3">
        {filteredWeatherForecast.map((item, index) => (
          <div key={index} className={`col-${singleDay ? "12 col-md-3 mb-3" : "12 col-md-2 mb-3"}`}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
