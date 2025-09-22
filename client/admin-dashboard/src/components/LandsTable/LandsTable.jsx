
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// الكود مع ربط 

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./LandsTable.css";

export default function LandsTable() {
  const [lands, setLands] = useState([]);
  const [editingLand, setEditingLand] = useState(null);
  const [editValues, setEditValues] = useState({});

  //  جلب الأراضي عند تحميل الصفحة
  useEffect(() => {
    loadLands();
  }, []);

  const loadLands = async () => {
    try {
      const res = await axios.get("/api/v1/lands");
      setLands(res.data.data || []);
    } catch (err) {
      console.error("Error fetching lands:", err);
    }
  };

  //  حذف أرض
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this land?")) {
      try {
        await axios.delete(`/api/v1/lands/${id}`);
        setLands(lands.filter((l) => l.id !== id));
      } catch (err) {
        console.error("Error deleting land:", err);
      }
    }
  };

  //  عرض تفاصيل أرض
  const handleView = (land) => {
    alert(
      ` تفاصيل الأرض:
      - المالك: ${land.ownerName}
      - المدينة: ${land.city}
      - المنطقة: ${land.region}
      - المساحة: ${land.area} م²
      - السعر: ${land.price} $`
    );
  };

  //  فتح وضع التعديل
  const handleEdit = (land) => {
    setEditingLand(land.id);
    setEditValues(land);
  };

  //  تعديل القيم
  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  //  حفظ التعديلات
  const handleSave = async (id) => {
    try {
      await axios.put(`/api/v1/lands/${id}`, editValues);
      setLands(lands.map((l) => (l.id === id ? editValues : l)));
      setEditingLand(null);
    } catch (err) {
      console.error("Error updating land:", err);
    }
  };

  return (
    <div className="table-container">
      <h2>Lands Table</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner ID</th>
            <th>Owner Name</th>
            <th>City</th>
            <th>Region</th>
            <th>Total Area</th>
            <th>Price</th>
            <th>State</th>
            <th>Procedures</th>
          </tr>
        </thead>
        <tbody>
          {lands.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.ownerId}</td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="text"
                    name="ownerName"
                    value={editValues.ownerName}
                    onChange={handleChange}
                  />
                ) : (
                  l.ownerName
                )}
              </td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="text"
                    name="city"
                    value={editValues.city}
                    onChange={handleChange}
                  />
                ) : (
                  l.city
                )}
              </td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="text"
                    name="region"
                    value={editValues.region}
                    onChange={handleChange}
                  />
                ) : (
                  l.region
                )}
              </td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="number"
                    name="area"
                    value={editValues.area}
                    onChange={handleChange}
                  />
                ) : (
                  l.area
                )}
              </td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editValues.price}
                    onChange={handleChange}
                  />
                ) : (
                  l.price
                )}
              </td>
              <td>{l.status}</td>
              <td className="action-buttons">
                {editingLand === l.id ? (
                  <button className="btn btn-edit" onClick={() => handleSave(l.id)}>
                    حفظ
                  </button>
                ) : (
                  <>
                    <button className="btn btn-view" onClick={() => handleView(l)}>
                      <FontAwesomeIcon icon={faEye} /> show
                    </button>
                    <button className="btn btn-edit" onClick={() => handleEdit(l)}>
                      <FontAwesomeIcon icon={faEdit} /> amendment
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(l.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
