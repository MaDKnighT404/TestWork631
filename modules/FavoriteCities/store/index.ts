import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FavoriteCity } from "../types";

type FavoriteCitiesStore = {
  favoriteCities: FavoriteCity[];
  addFavoriteCity: (city: FavoriteCity) => void;
  removeFavoriteCity: (city: FavoriteCity) => void;
};

export const useFavoriteCitiesStore = create<FavoriteCitiesStore>()(
  persist(
    (set) => ({
      favoriteCities: [],
      addFavoriteCity: (city) =>
        set((state) => ({ favoriteCities: [...state.favoriteCities, city] })),
      removeFavoriteCity: (city) =>
        set((state) => ({
          favoriteCities: state.favoriteCities.filter((c) => c.name !== city.name),
        })),
    }),
    {
      name: "favorite-cities-storage",
    }
  )
);
