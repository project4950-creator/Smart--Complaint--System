import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");
    const hasSubmitted =
      localStorage.getItem("has_submitted_complaint") === "true";

    if (!userId) {
      navigate("/citizen-login", { replace: true });
      return;
    }

    if (role === "CITIZEN") {
      navigate(
        hasSubmitted ? "/citizen-dashboard" : "/submit-complaint",
        { replace: true }
      );
      return;
    }

    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default LandingRedirect;
