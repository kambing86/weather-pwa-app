import { useRef } from "react";

export const useRefInSync = <T>(data: T) => {
  const ref = useRef(data);
  ref.current = data;
  return ref;
};
