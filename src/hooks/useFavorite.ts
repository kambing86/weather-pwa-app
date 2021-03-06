import { useCallback, useEffect, useState } from "react";

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
  return { favoriteList, addFavorite };
};
