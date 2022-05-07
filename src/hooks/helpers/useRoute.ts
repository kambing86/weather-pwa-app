import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRefInSync } from "./useRefInSync";

export function useRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRefInSync(location);

  const pushHistory = useCallback(
    (path: string) => {
      if (locationRef.current.pathname !== path) {
        navigate(path);
      }
    },
    [navigate, locationRef],
  );

  return {
    navigate,
    location,
    pushHistory,
  };
}
