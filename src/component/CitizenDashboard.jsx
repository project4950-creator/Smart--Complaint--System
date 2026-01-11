import { useEffect, useState } from "react";
import "./CitizenDashboard.css";
import {
  CheckCircle2,
  FileText,
  Send,
  Clock,
  UserCog,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// ✅ API BASE (ENV)
const API_BASE = import.meta.env.VITE_API_URL;

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const citizenId = localStorage.getItem("user_id");

  const [complaints, setComplaints] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/citizen-login");
  };

  useEffect(() => {
    if (!citizenId) {
      setLoading(false);
      return;
    }

    const fetchComplaints = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/citizen/complaints/${citizenId}/`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch complaints");
        }

        const data = await res.json();
        setComplaints(data);

        if (data.length > 0) {
          setSelectedId(data[0].id);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [citizenId]);

  const selected = complaints.find(
    (c) => String(c.id) === String(selectedId)
  );

  const getStep = (status) => {
    switch (status) {
      case "PENDING":
        return 1;
      case "IN PROGRESS":
        return 2;
      case "SUBMITTED":
        return 3;
      case "SENT_TO_MANAGER":
        return 4;
      case "DONE":
        return 5;
      default:
        return 1;
    }
  };

  const steps = [
    { label: "Pending", icon: Clock, color: "green" },
    { label: "Assigned to Karmachari", icon: FileText, color: "blue" },
    { label: "Work Completed", icon: Send, color: "purple" },
    { label: "Sent to Manager", icon: UserCog, color: "pink" },
    { label: "Done", icon: CheckCircle2, color: "teal" },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📍 Track Your Complaint Status</h2>

      {loading && <p>Loading complaints...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && complaints.length === 0 && (
        <p>No complaints found.</p>
      )}

      {/* ✅ ALWAYS VISIBLE SUBMIT BUTTON */}
      <div className="btn-back">
        <button
          style={{
            marginBottom: "20px",
            padding: "10px 16px",
            borderRadius: "8px",
            background:
              "linear-gradient(135deg, rgb(124, 58, 237), rgb(168, 85, 247), rgb(192, 132, 252))",
            color: "#212529",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={() => navigate("/submit-complaint")}
        >
          ➕ Submit New Complaint
        </button>
      </div>

      {!loading && complaints.length > 0 && (
        <>
          {/* DROPDOWN */}
          <select
            className="complaint-select"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {complaints.map((c, index) => (
              <option key={c.id} value={c.id}>
                📝 Complaint #{c.complaint_no ?? index + 1}
              </option>
            ))}
          </select>

          {selected && (
            <>
              {/* PROGRESS BAR */}
              <div className="progress-card">
                <div className="progress-row">
                  {steps.map((step, index) => {
                    const currentIndex = getStep(selected.status) - 1;
                    const isActive = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const isLast = index === steps.length - 1;
                    const Icon = step.icon;

                    return (
                      <div key={step.label} className="progress-node">
                        <div className="progress-step">
                          <div
                            className={`icon-circle ${step.color} ${
                              isActive ? "active" : ""
                            } ${isCurrent ? "current" : ""}`}
                          >
                            <Icon size={20} />
                          </div>

                          <div
                            className={`step-text ${
                              isActive ? "active" : ""
                            }`}
                          >
                            {step.label}
                          </div>
                        </div>

                        {!isLast && (
                          <div className="progress-line">
                            <div className="line-bg" />
                            <div
                              className={`line-fill ${step.color}`}
                              style={{
                                width:
                                  index < currentIndex ? "100%" : "0%",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DETAILS */}
              <div className="details-wrapper">
                <div className="details-card">
                  <h3>📄 Complaint Details</h3>
                  <p><b>Complaint #:</b> {selected.complaint_no}</p>
                  <p><b>Title:</b> {selected.title}</p>
                  <p><b>Area:</b> {selected.area}</p>
                  <p><b>Status:</b> {selected.status}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* LOGOUT */}
      <div>
        <button
          className="btn btn-danger logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default CitizenDashboard;
