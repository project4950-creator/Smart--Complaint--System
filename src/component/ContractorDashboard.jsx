import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContractorDashboard.css";

// ✅ API BASE FROM ENV
const API_BASE = import.meta.env.VITE_API_URL;

const ContractorDashboard = () => {
  const navigate = useNavigate();

  // ✅ GET LOGGED-IN CONTRACTOR ID
  const contractorId = localStorage.getItem("user_id");

  const [complaints, setComplaints] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch complaints (FILTERED BY CONTRACTOR)
  useEffect(() => {
    if (!contractorId) {
      alert("Session expired. Please login again.");
      navigate("/contractor-login");
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/contractor/complaints/${contractorId}/`
        );

        if (!res.ok) {
          throw new Error("Failed to load complaints");
        }

        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        console.error(err);
        alert("Unable to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [contractorId, navigate]);

  // ✅ Toggle selection
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // ✅ Assign complaints
  const assignToKarmachari = async () => {
    if (selected.length === 0) {
      alert("Select at least one complaint");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/assign-complaints/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ complaint_ids: selected }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Assignment failed");
        return;
      }

      alert(data.message || "Assigned successfully");

      // ✅ REMOVE ASSIGNED COMPLAINTS FROM UI
      setComplaints((prev) =>
        prev.filter((c) => !selected.includes(c.id))
      );
      setSelected([]);
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="contractor-dashboard">
      <h2>Collector Dashboard</h2>

      {/* NAVIGATION */}
      <div className="nav-button-container">
        <button onClick={() => navigate("/contractor-validation")}>
          Validate Completed Complaints →
        </button>
      </div>

      {/* INSTRUCTIONS */}
      <div className="instructions-card">
        <h4>📌 How to assign complaints</h4>
        <ol>
          <li>Review complaint details and image</li>
          <li>Select complaints using checkbox</li>
          <li>
            Click <b>Assign to Karmachari</b>
          </li>
        </ol>
      </div>

      {/* TABLE */}
      <h3>Assign Complaints</h3>

      {loading && <p>Loading complaints...</p>}

      {!loading && complaints.length === 0 && (
        <p>No complaints available.</p>
      )}

      {!loading && complaints.length > 0 && (
        <>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Before Image</th>
                <th>Title</th>
                <th>Area</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => (
                <tr key={c.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(c.id)}
                      onChange={() => toggleSelect(c.id)}
                    />
                  </td>
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

          {/* ASSIGN BUTTON */}
          <button
            className="complete-btn"
            onClick={assignToKarmachari}
          >
            Assign to Karmachari
          </button>
        </>
      )}
    </div>
  );
};

export default ContractorDashboard;
