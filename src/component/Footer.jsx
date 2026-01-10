import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 Clear ALL session-related data
    localStorage.clear();

    // 🔁 Redirect to login page
    navigate("/citizen-login", { replace: true });
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

     
    </footer>
  );
};

export default Footer;
