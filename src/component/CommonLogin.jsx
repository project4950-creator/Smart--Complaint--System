import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { useState } from "react";
import "./CommonLogin.css";

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

      const BASE_URL = import.meta.env.VITE_API_URL; // 👉 use env base URL

      const res = await fetch(`${BASE_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save session data
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("is_logged_in", "true");
      
      // reset on every login
      localStorage.setItem("has_submitted_complaint", "false");
      
      if (data.role === "CITIZEN") {
        navigate("/submit-complaint");
        return;
      }


        if (!hasSubmitted) {
          navigate("/submit-complaint"); // first time
        } else {
          navigate("/citizen-dashboard"); // revisit
        }
        return;
      }

      // Other roles
      navigate(data.redirect);
    } catch (err) {
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

        {/* Username */}
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

        {/* Password */}
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

        {/* Phone */}
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

        {/* Forgot Password */}
        <div
          className="forgot-link"
          onClick={() => navigate(forgotPath || "/forgot")}
        >
          Forgot password?
        </div>

        {/* Login Button */}
        <button
          className="btn-login"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Button */}
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
