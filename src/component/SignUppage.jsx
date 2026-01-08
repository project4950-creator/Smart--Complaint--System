import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import "./CommonLogin.css";

// ✅ API BASE FROM ENV (ROOT ONLY)
const API_BASE = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Signup handler
  const handleSignup = async () => {
    if (!form.username || !form.password || !form.phone || !form.email) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/api/signup/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Signup successful");
      navigate("/", { replace: true });
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

        <h3 className="login-title">Sign Up</h3>
        <p className="login-subtitle">
          Register your account to get started
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

        {/* EMAIL */}
        <label>Email</label>
        <div className="input-box">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* SIGNUP BUTTON */}
        <button
          className="btn-login"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* LOGIN BUTTON */}
        <button
          className="btn-signup"
          onClick={() => navigate("/")}
        >
          Login
        </button>

      </div>
    </div>
  );
};

export default SignUp;
