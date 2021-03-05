import { useCallback, useEffect, useState } from "react";

const FAVOURITE_KEY = "FAV";

export const useFavourite = () => {
  const [favouriteList, setFavouriteList] = useState<string[]>([]);
  useEffect(() => {
    const favourite = JSON.parse(
      localStorage.getItem(FAVOURITE_KEY) || "[]",
    ) as string[];
    setFavouriteList(favourite);
  }, []);
  const addFavourite = useCallback((city: string) => {
    setFavouriteList((curList) => {
      const newList = [...curList, city];
      localStorage.setItem(FAVOURITE_KEY, JSON.stringify(newList));
      return newList;
    });
  }, []);
  return { favouriteList, addFavourite };
};
