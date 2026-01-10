import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SubmitComplaint.css";
import { useNavigate } from "react-router-dom";

// ✅ API BASE FROM ENV (ROOT ONLY)
const API_BASE = import.meta.env.VITE_API_URL;

const SubmitComplaint = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [locationInfo, setLocationInfo] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [beforeImage, setBeforeImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);

  // 🔹 Detect waste type
  const handleDetectWaste = async () => {
    if (!beforeImage) {
      alert("Please upload an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", beforeImage);

    try {
      setDetecting(true);

      const response = await fetch(`${API_BASE}/api/detect-waste/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Detection failed");
        return;
      }

      setWasteType(data.waste_type);
    } catch (error) {
      console.error(error);
      alert("Error detecting waste");
    } finally {
      setDetecting(false);
    }
  };

  // 🔹 Submit complaint
  const handleSubmit = async () => {
    if (!title || !description || !area || !locationInfo || !beforeImage) {
      alert("Please fill all required fields");
      return;
    }

    const citizenId = localStorage.getItem("user_id");
    if (!citizenId) {
      alert("Session expired. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("citizen_id", citizenId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("waste_type", wasteType || "Unknown");
    formData.append("area", area);
    formData.append("location_info", locationInfo);
    formData.append("before_image", beforeImage);

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE}/api/complaint/create/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Complaint submitted successfully ✅");

      localStorage.setItem("has_submitted_complaint", "true");

      // 🔹 Reset form
      setTitle("");
      setDescription("");
      setArea("");
      setLocationInfo("");
      setWasteType("");
      setBeforeImage(null);
      document.getElementById("beforeImage").value = "";

      navigate("/citizen-dashboard");
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow complaint-card mx-auto">
        <div className="card-body">
          <h5 className="complaint-title fw-semibold mb-4">
            Submit Complaint
          </h5>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="form-label">Before Image</label>
          <input
            type="file"
            id="beforeImage"
            className="form-control mb-3"
            accept="image/*"
            onChange={(e) => {
              setBeforeImage(e.target.files[0]);
              setWasteType("");
            }}
          />

          {beforeImage && (
            <button
              className="btn btn-detect mb-3"
              onClick={handleDetectWaste}
              disabled={detecting}
            >
              {detecting ? "Detecting..." : "Detect Waste Type"}
            </button>
          )}

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Waste Type"
            value={wasteType}
            readOnly
          />

          <select
            className="form-control mb-3"
            value={area}
            onChange={(e) => {
              setArea(e.target.value);
              setLocationInfo("");
            }}
          >
            <option value="">Select Area</option>
            <option value="DN High School">DNICA School</option>
            <option value="MB Science College">MB Science College</option>
            <option value="SVP Highschool">SVP Highschool</option>
            <option value="Mahatma Gandhi Vidyalaya">
              Mahatma Gandhi Vidyalaya
            </option>
          </select>

          {area && (
            <input
              type="text"
              className="form-control mb-4"
              placeholder="Enter location details (e.g., Room 203, 2nd Floor)"
              value={locationInfo}
              onChange={(e) => setLocationInfo(e.target.value)}
            />
          )}

          <button
            className="btn btn-detect mb-3"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
