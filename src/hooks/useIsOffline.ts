import { useEffect, useState } from "react";

export const useIsOffline = () => {
  const [isOffline, setIsOffline] = useState(false);
  useEffect(() => {
    function offlineHandler() {
      setIsOffline(true);
    }
    window.addEventListener("offline", offlineHandler);
    function onlineHandler() {
      setIsOffline(false);
    }
    window.addEventListener("online", onlineHandler);
    return () => {
      window.removeEventListener("offline", offlineHandler);
      window.removeEventListener("online", onlineHandler);
    };
  }, []);
  return isOffline;
};
