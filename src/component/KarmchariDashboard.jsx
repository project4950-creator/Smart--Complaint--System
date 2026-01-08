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

  // ✅ Fetch assigned complaints
  useEffect(() => {
    if (!karmachariId) {
      setLoading(false);
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
      } catch (err) {
        console.error(err);
        alert("Unable to load assigned complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [karmachariId]);

  // ✅ Submit work with after image
  const submitWork = async () => {
    if (!selectedComplaint || !afterImage) {
      alert("Select complaint and upload image");
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
      <h2>Cleanup Dashboard</h2>

      <h3>Assigned Complaints</h3>

      {loading && <p>Loading complaints...</p>}

      {!loading && complaints.length === 0 && (
        <p>No assigned complaints.</p>
      )}

      {!loading && complaints.length > 0 && (
        <>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Before Image</th>
                <th>Title</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c, index) => (
                <tr key={c.id}>
                  <td>{index + 1}</td>
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
                </tr>
              ))}
            </tbody>
          </table>

          {/* SUBMIT SECTION */}
          <div className="form-section">
            <select
              value={selectedComplaint}
              onChange={(e) =>
                setSelectedComplaint(e.target.value)
              }
            >
              <option value="">Select Complaint ID</option>
              {complaints.map((c, index) => (
                <option key={c.id} value={c.id}>
                  {index + 1}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setAfterImage(e.target.files[0])
              }
            />

            <button
              className="submit-btn"
              onClick={submitWork}
            >
              Submit Image
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default KarmachariDashboard;
