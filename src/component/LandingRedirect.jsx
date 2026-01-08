import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");
    const hasSubmitted = localStorage.getItem("has_submitted_complaint");

    if (!userId) {
      navigate("/citizen-login");
      return;
    }

    if (role === "CITIZEN") {
      navigate(hasSubmitted ? "/citizen-dashboard" : "/submit-complaint");
      return;
    }

    navigate("/"); // fallback
  }, []);

  return null;
};

export default LandingRedirect;
