import "./Home.css";
import logo from "../assets/image.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">

       {/* Background animations (optional, safe even if empty) */}
      <div className="waste-items-container">
  <div className="waste-item waste-bottle-1">🍌</div>
  <div className="waste-item waste-paper-1">📄</div>
  <div className="waste-item waste-can-1">💉</div>

  <div className="waste-item waste-plastic-1">🧃</div>
  <div className="waste-item waste-plastic-2">♻️</div>
  <div className="waste-item waste-plastic-3">🗑️</div>

  <div className="waste-item waste-leaf-1">🍃</div>
  <div className="waste-item waste-leaf-2">🧹</div>
</div>


      <h1 className="title">
        Welcome to the Smart Waste Complaint & Collection Portal
      </h1>

      <div className="logo-wrapper">
        <img src={logo} alt="SafaiDoot" />
      </div>

      <h2 className="subtitle">
        Clean Cities Begin With Smart Action
      </h2>

      <div className="button-group">
        <button
          className="btn-cus"
          onClick={() => navigate("/citizen-login")}
        >
          Citizen Login
        </button>

        <button
          className="btn-cus"
          onClick={() => navigate("/manager-login")}
        >
          Manager Login
        </button>

        <button
          className="btn-cus"
          onClick={() => navigate("/contractor-login")}
        >
          Contractor Login
        </button>

        <button
          className="btn-cus"
          onClick={() => navigate("/karmchari-login")}
        >
          Safaidoot Login
        </button>
      </div>

    </div>
  );
};

export default Home;
