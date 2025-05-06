const CITY_NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s\-']+$/;
const MIN_CITY_NAME_LENGTH = 2;
const MAX_CITY_NAME_LENGTH = 85;

export const validateCityName = (cityName: string): { isValid: boolean; errorMessage?: string } => {
  if (!cityName || cityName.trim() === "") {
    return { isValid: false, errorMessage: "Enter the city name" };
  }

  if (cityName.length < MIN_CITY_NAME_LENGTH) {
    return {
      isValid: false,
      errorMessage: `City name must be at least ${MIN_CITY_NAME_LENGTH} characters`,
    };
  }

  if (cityName.length > MAX_CITY_NAME_LENGTH) {
    return {
      isValid: false,
      errorMessage: `City name must not exceed ${MAX_CITY_NAME_LENGTH} characters`,
    };
  }

  if (!CITY_NAME_REGEX.test(cityName)) {
    return {
      isValid: false,
      errorMessage: "City name can only contain letters, spaces, hyphens, and apostrophes",
    };
  }

  return { isValid: true };
};
