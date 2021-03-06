import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRefInSync } from "./useRefInSync";

export function useRoute() {
  const history = useHistory();
  const location = useLocation();
  const locationRef = useRefInSync(location);

  const pushHistory = useCallback(
    (path: string) => {
      if (locationRef.current.pathname !== path) {
        history.push(path);
      }
    },
    [history, locationRef],
  );

  return {
    history,
    location,
    pushHistory,
  };
}
