
//////////////////////////////////////////////////////////////////////////////////////////////////
// كود الربط مع القاعدة
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./BookedTable.css";

export default function BookingsTable() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); 
  const [editingBooking, setEditingBooking] = useState(null); 
  const [editValues, setEditValues] = useState({});

  // جلب الحجوزات
  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const res = await axios.get("/api/v1/bookings");
      setBookings(res.data.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // حذف حجز
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`/api/v1/bookings/${id}`);
        setBookings(bookings.filter((b) => b.id !== id));
      } catch (err) {
        console.error("Error deleting booking:", err);
      }
    }
  };

  // عرض نافذة منبثقة
  const handleView = (booking) => {
    setSelectedBooking(booking);
  };

  //   التعديل
  const handleEdit = (booking) => {
    setEditingBooking(booking.id);
    setEditValues(booking);
  };

  // تعديل القيم
  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  // حفظ التعديلات
  const handleSave = async (id) => {
    try {
      await axios.put(`/api/v1/bookings/${id}`, editValues);
      setBookings(bookings.map((b) => (b.id === id ? editValues : b)));
      setEditingBooking(null);
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  return (
    <div className="table-container">
      <h2>Bookings Table</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Investor ID</th>
            <th>Investor Name</th>
            <th>Land ID</th>
            <th>Booking start date</th>
            <th>Booking end date</th>
            <th>Procedures</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.investorId}</td>
              <td>{b.landId}</td>
              <td>
                {editingBooking === b.id ? (
                  <input
                    type="text"
                    name="investorName"
                    value={editValues.investorName || ""}
                    onChange={handleChange}
                  />
                ) : (
                  b.investorName
                )}
              </td>
              <td>
                {editingBooking === b.id ? (
                  <input
                    type="date"
                    name="startDate"
                    value={editValues.startDate || ""}
                    onChange={handleChange}
                  />
                ) : (
                  new Date(b.startDate).toLocaleDateString()
                )}
              </td>
              <td>
                {editingBooking === b.id ? (
                  <input
                    type="date"
                    name="endDate"
                    value={editValues.endDate || ""}
                    onChange={handleChange}
                  />
                ) : (
                  new Date(b.endDate).toLocaleDateString()
                )}
              </td>
              <td className="action-buttons">
                {editingBooking === b.id ? (
                  <>
                    <button className="btn btn-save" onClick={() => handleSave(b.id)}>
                      <FontAwesomeIcon icon={faSave} /> save
                    </button>
                    <button className="btn btn-cancel" onClick={() => setEditingBooking(null)}>
                      <FontAwesomeIcon icon={faTimes} /> cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-view" onClick={() => handleView(b)}>
                      <FontAwesomeIcon icon={faEye} /> show
                    </button>
                    <button className="btn btn-edit" onClick={() => handleEdit(b)}>
                      <FontAwesomeIcon icon={faEdit} /> edit
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(b.id)}>
                      <FontAwesomeIcon icon={faTrash} /> delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      {selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <h3>Booking Details</h3>
            <p><strong>ID:</strong> {selectedBooking.id}</p>
            <p><strong>Investor ID:</strong> {selectedBooking.investorId}</p>
            <p><strong>Investor:</strong> {selectedBooking.investorName}</p>
            <p><strong>Land ID:</strong> {selectedBooking.landId}</p>
            <p><strong>Start Date:</strong> {new Date(selectedBooking.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedBooking.endDate).toLocaleDateString()}</p>
            <button onClick={() => setSelectedBooking(null)}>close</button>
          </div>
        </div>
      )}
    </div>
  );
}
