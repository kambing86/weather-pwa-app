import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);

  return null;
};

export default RedirectHome;
