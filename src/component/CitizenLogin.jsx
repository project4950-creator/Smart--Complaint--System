import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonLogin from "./CommonLogin";

const CitizenLogin = () => {
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");
  const isLoggedIn = localStorage.getItem("is_logged_in");
  const hasSubmitted = localStorage.getItem("has_submitted_complaint");

  if (isLoggedIn === "true" && userId && role === "CITIZEN") {
    navigate(
      hasSubmitted === "true"
        ? "/citizen-dashboard"
        : "/submit-complaint",
      { replace: true }
    );
  }
}, [navigate]);


    if (userId && role === "CITIZEN") {
      navigate(
        hasSubmitted === "true"
          ? "/citizen-dashboard"
          : "/submit-complaint",
        { replace: true }
      );
    }
  }, [navigate]);

  return (
    <CommonLogin
      role="Citizen"
      signupPath="/signup"
      forgotPath="/forgot"
    />
  );
};

export default CitizenLogin;
