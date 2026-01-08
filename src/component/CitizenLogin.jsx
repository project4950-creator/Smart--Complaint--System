import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommonLogin from "./CommonLogin";

const CitizenLogin = () => {
  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");
    const hasSubmitted = localStorage.getItem("has_submitted_complaint");

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
