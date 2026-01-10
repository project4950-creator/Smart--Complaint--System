import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 Clear session / auth data
    localStorage.clear();

    // 🔹 Redirect to home page
    navigate("/");
  };

  return (
    <footer className="app-footer">
      <p>
        © {new Date().getFullYear()} Smart Waste Complaint & Collection Portal.
        <br />
        Developed by{" "}
        <a
          href="https://www.linkedin.com/in/meghraj-solanki-0003a639b"
          target="_blank"
          rel="noopener noreferrer"
        >
          Meghraj
        </a>
        ,{" "}
        <a
          href="https://www.linkedin.com/in/mayur-chavda-367562367"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mayur
        </a>{" "}
        &{" "}
        <a
          href="https://www.linkedin.com/in/kiran-n-thakor-2573323a4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Kiran
        </a>
      </p>

      {/* 🔹 Logout Button */}
      <button className="btn btn-danger logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </footer>
  );
};

export default Footer;
