import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContractorValidationDashboard.css";

// ✅ API BASE FROM ENV (ROOT ONLY)
const API_BASE = import.meta.env.VITE_API_URL;

const ContractorValidationDashboard = () => {
  const navigate = useNavigate();
  const contractorId = localStorage.getItem("user_id");

  const [complaints, setComplaints] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch completed complaints
  useEffect(() => {
    if (!contractorId) {
      setLoading(false);
      return;
    }

    const fetchCompletedComplaints = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/contractor/completed/${contractorId}/`
        );

        if (!res.ok) {
          throw new Error("Failed to load complaints");
        }

        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        console.error(err);
        alert("Unable to load completed complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedComplaints();
  }, [contractorId]);

  // ✅ Toggle selection
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // ✅ Submit to manager
  const submitToManager = async () => {
    if (selected.length === 0) {
      alert("Select at least one complaint");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/contractor/submit-manager/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ complaint_ids: selected }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Submission failed");
        return;
      }

      alert(data.message || "Submitted to manager");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="contractor-validation-dashboard">
      <h2>Contractor Validation Dashboard</h2>

      {/* BACK BUTTON */}
      <button
        className="back-btn"
        onClick={() => navigate("/contractor-dashboard")}
      >
        ← Back to Assignment Dashboard
      </button>

      {/* INSTRUCTIONS */}
      <div className="instructions-card">
        <h4>📌 Validate complaints and send to Manager</h4>
        <ol>
          <li>Review Before & After images</li>
          <li>Select completed complaints</li>
          <li>
            Click <b>Submit To Manager</b>
          </li>
        </ol>
      </div>

      {/* TABLE */}
      {loading && <p>Loading complaints...</p>}

      {!loading && complaints.length === 0 && (
        <p>No completed complaints found.</p>
      )}

      {!loading && complaints.length > 0 && (
        <>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Before Image</th>
                <th>After Image</th>
                <th>Title</th>
                <th>Area</th>
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
                  <td>
                    {c.after_image_url ? (
                      <img
                        src={c.after_image_url}
                        alt="after"
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

          {/* SUBMIT BUTTON */}
          <button
            className="submit-btn"
            onClick={submitToManager}
          >
            Submit To Manager
          </button>
        </>
      )}
    </div>
  );
};

export default ContractorValidationDashboard;
