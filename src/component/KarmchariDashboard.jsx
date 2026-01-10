import { useEffect, useState } from "react";
import "./KarmachariDashboard.css";

// ✅ API BASE FROM ENV (ROOT ONLY)
const API_BASE = import.meta.env.VITE_API_URL;

const KarmachariDashboard = () => {
  const karmachariId = localStorage.getItem("user_id");

  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [afterImage, setAfterImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch assigned complaints
  useEffect(() => {
    if (!karmachariId) {
      setLoading(false);
      setError("Karmachari not logged in.");
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/karmachari/complaints/${karmachariId}/`
        );

        if (!res.ok) {
          throw new Error("Failed to load complaints");
        }

        const data = await res.json();
        setComplaints(data);
        if (data.length > 0) setSelectedComplaint(data[0].id);
      } catch (err) {
        console.error(err);
        setError("Unable to load assigned complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [karmachariId]);

  // ✅ Submit work with after image
  const submitWork = async () => {
    if (!selectedComplaint || !afterImage) {
      alert("Select a complaint and upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("complaint_id", selectedComplaint);
      formData.append("karmachari_id", karmachariId);
      formData.append("after_image", afterImage);

      const res = await fetch(
        `${API_BASE}/api/karmachari/submit-work/`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed");
        return;
      }

      alert(data.message || "Work submitted successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="karmachari-dashboard">
      <h2>🧹 Cleanup Dashboard</h2>

      {loading && <p>Loading complaints...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && complaints.length === 0 && !error && (
        <p>No assigned complaints.</p>
      )}

      {!loading && complaints.length > 0 && (
        <>
          {/* Complaints Table */}
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Before Image</th>
                <th>Title</th>
                <th>Area</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, index) => (
                <tr key={c.id}>
                  <td>{c.complaint_no || index + 1}</td>
                  <td>
                    {c.before_image_url ? (
                      <img
                        src={c.before_image_url}
                        alt="before"
                        className="thumbnail-img"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{c.title}</td>
                  <td>{c.area}</td>
                  <td>{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Submit Work Section */}
          <div className="form-section">
            <h3>Submit Completed Work</h3>
            <select
              value={selectedComplaint}
              onChange={(e) => setSelectedComplaint(e.target.value)}
            >
              {complaints.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.complaint_no || c.id} - {c.title}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAfterImage(e.target.files[0])}
            />

            <button className="submit-btn" onClick={submitWork}>
              Submit Image
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default KarmachariDashboard;
