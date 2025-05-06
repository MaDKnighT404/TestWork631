"use client";

import Link from "next/link";

import { useWeatherForecastStore } from "@/modules/WeatherForecast/store";

import { useActiveRoute } from "../hooks/useActiveRoute";
import { NAVIGATIONS_ROUTES } from "../constants";

export default function Navigation() {
  const { checkIsActive } = useActiveRoute();
  const { weatherForecastData } = useWeatherForecastStore();

  const filteredRoutes = weatherForecastData
    ? NAVIGATIONS_ROUTES
    : NAVIGATIONS_ROUTES.filter(({ path }) => path !== "/forecast");

  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        {filteredRoutes.map(({ path, label }) => (
          <li key={path} className="nav-item mx-2">
            <Link className={`nav-link text-center${checkIsActive(path)}`} href={path}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
