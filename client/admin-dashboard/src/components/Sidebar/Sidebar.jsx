import React from "react";
import "./Sidebar.css";

export default function Sidebar({ setActivePage }) {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // إذا كنت تستخدم localStorage لحفظ بيانات الدخول
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");

      alert("You have successfully logged out");

      // إعادة توجيه لصفحة تسجيل الدخول
      window.location.href = "/login"; 
    }
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <button onClick={() => setActivePage("users")}>Users</button>
      <button onClick={() => setActivePage("lands")}>Lands</button>
      <button onClick={() => setActivePage("booked")}>Reservations</button>
      <button onClick={() => setActivePage("pending")}>Pending Lands</button>
      <button onClick={() => setActivePage("comments")}>Comments</button>
      <button  onClick={handleLogout}>Check Out</button>
    </div>
  );
}
