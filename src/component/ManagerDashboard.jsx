import { useEffect, useState } from "react";
import "./ManagerDashboard.css";

// ✅ API BASE FROM ENV (ROOT ONLY)
const API_BASE = import.meta.env.VITE_API_URL;

const ManagerDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch complaints for manager
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/manager/complaints/`
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
  }, []);

  // ✅ Toggle checkbox
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // ✅ Mark complaints as completed
  const markCompleted = async () => {
    if (selected.length === 0) {
      alert("Select at least one complaint");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/manager/mark-completed/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            complaint_ids: selected,
            points: 10,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Operation failed");
        return;
      }

      alert(data.message || "Marked as completed");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="manager-dashboard">
      <h2>Manager Dashboard</h2>

      {/* INSTRUCTIONS */}
      <div className="instructions-card">
        <h4>📌 How to validate complaints</h4>
        <ol>
          <li>Review before & after images</li>
          <li>Verify cleanup quality</li>
          <li>Mark complaint as DONE</li>
        </ol>
      </div>

      {/* TABLE */}
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
                        alt="Before"
                        width="80"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>
                    {c.after_image_url ? (
                      <img
                        src={c.after_image_url}
                        alt="After"
                        width="80"
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

          {/* COMPLETE BUTTON */}
          <button
            className="complete-btn"
            onClick={markCompleted}
          >
            Mark as Completed
          </button>
        </>
      )}
    </div>
  );
};

export default ManagerDashboard;
