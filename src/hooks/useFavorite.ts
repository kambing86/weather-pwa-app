import { useCallback, useState } from "react";
import type { LocationData } from "types/data";
import { findLocationIndex, getGeolocationFromString } from "utils/location";
import { useRefInSync } from "./helpers/useRefInSync";

const FAVORITE_KEY = "WEATHER_PWA_FAV";

export const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useState<
    Array<string | LocationData>
  >(() => {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY) || "[]") as Array<
      string | LocationData
    >;
  });
  const addFavorite = useCallback((location: string | LocationData) => {
    setFavoriteList((curList) => {
      const newList = [...curList];
      if (typeof location === "string") {
        newList.push(location);
      } else {
        const { name, lat, lon, country } = location;
        newList.push({
          name,
          lat,
          lon,
          country,
        });
      }
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(newList));
      return newList;
    });
  }, []);
  const removeFavorite = useCallback((location: string | LocationData) => {
    setFavoriteList((curList) => {
      const newList = [...curList];
      const index = findLocationIndex(newList, location);
      newList.splice(index, 1);
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(newList));
      return newList;
    });
  }, []);
  const favoriteListRef = useRefInSync(favoriteList);
  const isFavorite = useCallback(
    (location: string | LocationData) => {
      return findLocationIndex(favoriteListRef.current, location) >= 0;
    },
    [favoriteListRef],
  );
  const clickFavorite = useCallback(
    (location: string | LocationData) => {
      if (isFavorite(location)) {
        removeFavorite(location);
      } else {
        addFavorite(location);
      }
    },
    [isFavorite, removeFavorite, addFavorite],
  );
  const getNameFromFavorite = useCallback(
    (location?: string) => {
      if (location == null) return null;
      const geolocation = getGeolocationFromString(location);
      if (geolocation == null) return null;
      const [lat, lon] = geolocation;
      const found = favoriteListRef.current.find((l) => {
        if (typeof l === "string") return false;
        return l.lat === lat && l.lon === lon;
      }) as LocationData | undefined;
      return found?.name;
    },
    [favoriteListRef],
  );
  return { favoriteList, isFavorite, clickFavorite, getNameFromFavorite };
};
