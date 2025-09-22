

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UsersTable.css";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // رابط الباك إند
  const BASE_URL = "http://localhost:3000/api/v1/users";

  useEffect(() => {
    loadUsers();
  }, []);

  // جلب كل المستخدمين
  const loadUsers = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // حذف مستخدم
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // تعديل مستخدم
  const handleSave = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/${id}`, editUser);
      setEditUser(null);
      loadUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="table-container">
      <h2>Users Table</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>State</th>
            <th>Procedures</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {editUser?.id === u.id ? (
                  <input
                    value={editUser.first_name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, first_name: e.target.value })
                    }
                  />
                ) : (
                  u.first_name
                )}
              </td>
              <td>
                {editUser?.id === u.id ? (
                  <input
                    value={editUser.last_name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, last_name: e.target.value })
                    }
                  />
                ) : (
                  u.last_name
                )}
              </td>
              <td>
                {editUser?.id === u.id ? (
                  <input
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                  />
                ) : (
                  u.email
                )}
              </td>
              <td>
                {editUser?.id === u.id ? (
                  <input
                    value={editUser.status}
                    onChange={(e) =>
                      setEditUser({ ...editUser, status: e.target.value })
                    }
                  />
                ) : (
                  u.status
                )}
              </td>
              <td className="action-buttons">
                {editUser?.id === u.id ? (
                  <>
                    <button
                      className="btn btn-view"
                      onClick={() => handleSave(u.id)}
                    >
                      save
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => setEditUser(null)}
                    >
                      cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-view"
                      onClick={() =>
                        alert(
                          `User: ${u.first_name} ${u.last_name}\nEmail: ${u.email}`
                        )
                      }
                    >
                      show
                    </button>
                    <button
                      className="btn btn-edit"
                      onClick={() => setEditUser(u)}
                    >
                      amendment
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(u.id)}
                    >
                      delete
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

 