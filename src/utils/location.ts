import { LocationData } from "types/data";
import { isNumeric } from "./number";

export function findLocationIndex(
  locList: Array<string | LocationData>,
  location: string | LocationData,
) {
  let index = -1;
  if (typeof location === "string") {
    index = locList.indexOf(location);
  } else {
    index = locList.findIndex((l) => {
      if (typeof l === "string") return false;
      return l.name === location.name && l.country === location.country;
    });
    if (index === -1) {
      index = locList.findIndex((l) => {
        if (typeof l === "string") return l === location.name;
        return false;
      });
    }
  }
  return index;
}

export function getGeolocationFromString(location: string) {
  const geolocationString = location.split("|");
  if (isGeolocation(geolocationString)) {
    const [lat, lon] = geolocationString;
    return [parseFloat(lat), parseFloat(lon)];
  }
  return null;
}

export function isGeolocation(
  geolocationString: string[],
): geolocationString is [string, string] {
  return (
    geolocationString.length === 2 &&
    geolocationString.every((str) => isNumeric(str))
  );
}
