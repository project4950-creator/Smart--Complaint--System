import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

const AdminTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [karmacharis, setKarmacharis] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [cRes, kRes] = await Promise.all([
        fetch(`${API_BASE}/api/admin/complaints/`),
        fetch(`${API_BASE}/api/admin/karmacharis/`)
      ]);

      const cData = await cRes.json();
      const kData = await kRes.json();

      setComplaints(cData);
      setKarmacharis(kData);
    } catch (err) {
      alert("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteComplaint = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/complaints/${id}/`,
        { method: "DELETE" }
      );
      const data = await res.json();
      alert(data.message);
      loadData();
    } catch {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>
      {/* ================= COMPLAINTS TABLE ================= */}
      <h2>📋 Complaints (Admin)</h2>

      <table border="1" cellPadding="10" width="100%" style={{ marginBottom: 40 }}>
        <thead style={{ background: "#f3f4f6" }}>
          <tr>
            <th>Complaint #</th>
            <th>Title</th>
            <th>Area</th>
            <th>Status</th>
            <th>Karmachari</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.complaint_no}</td>
              <td>{c.title}</td>
              <td>{c.area}</td>
              <td>{c.status}</td>
              <td>{c.karmachari ? c.karmachari.name : "—"}</td>
              <td>
                <button
                  style={{ background: "red", color: "#fff", border: "none", padding: "6px 12px" }}
                  onClick={() => deleteComplaint(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= KARMA CHARIS TABLE ================= */}
      <h2>🧹 Safai Karmacharis</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead style={{ background: "#f3f4f6" }}>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Area</th>
            <th>Status</th>
            <th>Current Complaint</th>
          </tr>
        </thead>
        <tbody>
          {karmacharis.map((k) => (
            <tr key={k.id}>
              <td>{k.name}</td>
              <td>{k.phone}</td>
              <td>{k.area}</td>
              <td>
                <b style={{ color: k.status === "FREE" ? "green" : "red" }}>
                  {k.status}
                </b>
              </td>
              <td>
                {k.current_complaint
                  ? `#${k.current_complaint.complaint_no}`
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;


