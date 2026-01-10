import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { useState } from "react";
import "./CommonLogin.css";

const API_BASE = import.meta.env.VITE_API_URL;

const CommonLogin = ({ role = "Citizen", signupPath }) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // 🔥 CLEAR OLD SESSION DATA
      localStorage.clear();

      // ✅ SAVE NEW SESSION
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("role", data.role);

      if (data.area) {
        localStorage.setItem("area", data.area);
      }

      // ✅ CITIZEN FLOW (ALWAYS GO TO SUBMIT FIRST)
      if (data.role === "CITIZEN") {
        navigate("/submit-complaint", { replace: true });
        return;
      }

      // ✅ OTHER ROLES
      navigate(data.redirect || "/", { replace: true });

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

        <label>Username</label>
        <div className="input-box">
          <FaUser />
          <input
            type="text"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
        </div>

        <label>Password</label>
        <div className="input-box">
          <FaLock />
          <input
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <label>Phone Number</label>
        <div className="input-box">
          <FaPhone className="phone-icon"/>
          <input
            type="text"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />
        </div>

        <button
          className="btn-login"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

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
