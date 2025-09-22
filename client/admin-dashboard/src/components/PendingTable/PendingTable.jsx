
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// نسخة مع ربط
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PendingTable.css";

export default function PendingTable() {
  const [pending, setPending] = useState([]);
  const [confirmingId, setConfirmingId] = useState(null);

  // جلب الأراضي المعلقة من القاعدة
  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    try {
      const res = await axios.get("/api/v1/lands/pending");
      setPending(res.data.data || []);
    } catch (err) {
      console.error("Error fetching pending lands:", err);
    }
  };

  // قبول أرض معلقة (نشرها على الموقع)
  const handleAccept = async (id) => {
    try {
      await axios.put(`/api/v1/lands/${id}/accept`); 
      setPending(pending.filter((p) => p.id !== id));
      setConfirmingId(null);
    } catch (err) {
      console.error("Error accepting land:", err);
    }
  };

  // رفض أرض معلقة (إزالتها)
  const handleReject = async (id) => {
    try {
      await axios.delete(`/api/v1/lands/${id}/reject`);
      setPending(pending.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error rejecting land:", err);
    }
  };

  return (
    <div className="table-container">
      <h2>Pending Table</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner ID</th>
            <th>Owner Name</th>
            <th>publishing date</th>
            <th>Ownership document</th>
            <th>Owner's personal ID</th>
            <th>Procedures</th>
          </tr>
        </thead>
        <tbody>
          {pending.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.ownerId}</td>
              <td>{p.ownerName}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
              <td>
                <img src={p.docImage} alt="Document" width={50} />
              </td>
              <td>
                <img src={p.idImage} alt="ID" width={50} />
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-view"
                    onClick={() => setConfirmingId(p.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleReject(p.id)}
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* نافذة التأكيد */}
      {confirmingId && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm acceptance</h3>
            <p>Do you want to publish this land on the site?</p>
            <button
              className="btn btn-view"
              onClick={() => handleAccept(confirmingId)}
            >
              Yes
            </button>
            <button
              className="btn btn-delete"
              onClick={() => setConfirmingId(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
