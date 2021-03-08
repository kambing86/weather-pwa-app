import { useCallback, useEffect, useState } from "react";
import { useRefInSync } from "./helpers/useRefInSync";

const FAVORITE_KEY = "WEATHER_PWA_FAV";

export const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  useEffect(() => {
    const favourite = JSON.parse(
      localStorage.getItem(FAVORITE_KEY) || "[]",
    ) as string[];
    setFavoriteList(favourite);
  }, []);
  const addFavorite = useCallback((city: string) => {
    setFavoriteList((curList) => {
      const newList = [...curList, city];
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(newList));
      return newList;
    });
  }, []);
  const removeFavorite = useCallback((city: string) => {
    setFavoriteList((curList) => {
      const newList = [...curList];
      const index = newList.indexOf(city);
      newList.splice(index, 1);
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(newList));
      return newList;
    });
  }, []);
  const favoriteListRef = useRefInSync(favoriteList);
  const isFavorite = useCallback(
    (city: string) => {
      return favoriteListRef.current.indexOf(city) >= 0;
    },
    [favoriteListRef],
  );
  const clickFavorite = useCallback(
    (location: string) => {
      if (isFavorite(location)) {
        removeFavorite(location);
      } else {
        addFavorite(location);
      }
    },
    [isFavorite, removeFavorite, addFavorite],
  );
  return { favoriteList, isFavorite, clickFavorite };
};
