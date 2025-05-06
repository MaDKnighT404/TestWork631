import React from "react";

import WeatherForecast from "@/modules/WeatherForecast/WeatherForecast";

export default function ForecastPage() {
  return (
    <section className="container justify-content-center pt-5 d-flex flex-column gap-4">
      <div className="col-12 md-10 mt-4 mx-auto d-flex flex-column gap-4">
        <WeatherForecast />
      </div>
    </section>
  );
}
