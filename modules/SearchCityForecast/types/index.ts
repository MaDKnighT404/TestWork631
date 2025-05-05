export type Geocode = {
  lat: number;
  lon: number;
};

export type GeocodeResponse = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  local_names?: {
    [key: string]: string;
  };
};

export type CityData = {
  id: number;
  name: string;
  coord: Geocode;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type WeatherForecastData = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type CityWeatherForecastResponse = {
  city: CityData;
  list: WeatherForecastData[];
};
