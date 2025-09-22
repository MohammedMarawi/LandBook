
/////////////////////////////////////////////////////////////////////////////////////////////////////
// /جلب من القاعدة/


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommentsTable.css";

export default function CommentsTable() {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);

  // جلب التعليقات من القاعدة
  useEffect(() => {
    axios
      .get("/api/v1/lands/1/reviews") 
      .then((res) => {
        console.log("Comments API response:", res.data);
        setComments(res.data.data || []);
      })
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);



  //  حذف تعليق
  const handleDelete = (id) => {
    axios
      .delete(`/api/v1/reviews/${id}`)
      .then(() => {
        setComments(comments.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Error deleting comment:", err));
  };

  //  عرض تعليق بواجهة منبثقة
  const handleView = (comment) => {
    setSelectedComment(comment);
  };

  const closeModal = () => {
    setSelectedComment(null);
  };

  return (
    <div className="table-container">
      <h2>Comment Table</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>User Name</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Procedures</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.userId}</td>
              <td>{c.userName}</td>
              <td className="comment">{c.comment}</td>
              <td>{c.date ? new Date(c.date).toLocaleDateString() : "—"}</td>
              <td className="action-buttons">
                <button className="btn btn-view" onClick={() => handleView(c)}>
                  show
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(c.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {selectedComment && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Comment Details</h3>
            <p><strong>ID:</strong> {selectedComment.id}</p>
            <p><strong>User ID:</strong> {selectedComment.userId}</p>
            <p><strong>User Name:</strong> {selectedComment.userName}</p>
            <p><strong>Comment:</strong> {selectedComment.comment}</p>
            <p><strong>Date:</strong> {selectedComment.date ? new Date(selectedComment.date).toLocaleDateString() : "—"}</p>
            <button onClick={closeModal} className="btn btn-close">close</button>
          </div>
        </div>
      )}
    </div>
  );
}
