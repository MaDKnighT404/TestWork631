import SearchCityForecast from "@/modules/SearchCityForecast/SearchCityForecast";
import WeatherForecast from "@/modules/WeatherForecast/WeatherForecast";

import styles from "./page.module.scss";

export default function MainPage() {
  return (
    <div className="my-25">
      <section className={styles.heroSection}>
        <div className="position-absolute top-50 start-50 translate-middle text-center w-100 px-3">
          <h1 className="text-white mb-0">Weather forecast by locations</h1>
        </div>
      </section>
      <section className="container justify-content-center pt-5 d-flex flex-column gap-4">
        <h2 className="row justify-content-center">Search for a location</h2>
        <div className="col-12 col-sm-8 mt-4 mx-auto d-flex flex-column gap-4">
          <SearchCityForecast />
          <WeatherForecast singleDay />
        </div>
      </section>
    </div>
  );
}
