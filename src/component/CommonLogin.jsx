import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { useState } from "react";
import "./CommonLogin.css";

// ✅ API BASE FROM ENV
const API_BASE = import.meta.env.VITE_API_URL;

const CommonLogin = ({ role = "Citizen", signupPath, forgotPath }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.username || !form.password || !form.phone) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ SAVE SESSION DATA
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("role", data.role);

      if (data.area) {
        localStorage.setItem("area", data.area);
      }

      // ✅ CITIZEN FLOW
      if (data.role === "CITIZEN") {
        const hasSubmitted =
          localStorage.getItem("has_submitted_complaint") === "true";

        navigate(
          hasSubmitted
            ? "/citizen-dashboard"
            : "/submit-complaint",
          { replace: true }
        );
        return;
      }

      // ✅ OTHER ROLES (ADMIN / STAFF / MANAGER)
      if (data.redirect) {
        navigate(data.redirect, { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-icon">
          <FaUser />
        </div>

        <h3 className="login-title">{role} Login</h3>
        <p className="login-subtitle">
          Welcome back! Please enter your details
        </p>

        {/* USERNAME */}
        <label>Username</label>
        <div className="input-box">
          <FaUser />
          <input
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <label>Password</label>
        <div className="input-box">
          <FaLock />
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* PHONE */}
        <label>Phone Number</label>
        <div className="input-box">
          <FaPhone className="phone-icon" />
          <input
            type="text"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        {/* FORGOT PASSWORD */}
        {/* <div
          className="forgot-link"
          onClick={() => navigate(forgotPath || "/forgot")}
        >
          Forgot password?
        </div> */}

        {/* LOGIN BUTTON */}
        <button
          className="btn-login"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* SIGNUP BUTTON */}
        <button
          className="btn-signup"
          onClick={() => navigate(signupPath || "/signup")}
        >
          Sign Up
        </button>

      </div>
    </div>
  );
};

export default CommonLogin;
