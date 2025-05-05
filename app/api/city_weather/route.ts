import { NextRequest, NextResponse } from "next/server";

import { GeocodeResponse, CityWeatherForecastResponse } from "@/modules/SearchCityForecast/types";

import { axiosInstance } from "@/shared/axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "City name is required" }, { status: 400 });
  }

  try {
    // Get geocode data by city name
    const geocodeResponse = await axiosInstance.get<GeocodeResponse[]>(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    console.log(geocodeResponse.data);
    if (!geocodeResponse.data.length) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    const { name, local_names, lat, lon } = geocodeResponse.data[0];

    // Get weather forecast by coordinates
    const forecastResponse = await axiosInstance.get<CityWeatherForecastResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    const forecastData = {
      ...forecastResponse.data,
      city: {
        ...forecastResponse.data.city,
        name,
        local_names,
      },
    };

    return NextResponse.json(forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json({ error: "Error fetching weather data" }, { status: 500 });
  }
}
