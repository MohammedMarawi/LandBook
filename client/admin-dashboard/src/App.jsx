import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar"; 
import UsersTable from "./components/UsersTable/UsersTable";
import LandsTable from "./components/LandsTable/LandsTable";
import BookedTable from "./components/BookedTable/BookedTable";
import PendingTable from "./components/PendingTable/PendingTable";
import CommentsTable from "./components/CommentsTable/CommentsTable";
import StatsDashboard from "./components/StatsDashboard/StatsDashboard"; 
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("users");

  const renderContent = () => {
    switch (activePage) {
      case "users": return <UsersTable />;
      case "lands": return <LandsTable />;
      case "booked": return <BookedTable />;
      case "pending": return <PendingTable />;
      case "comments": return <CommentsTable />;
      default: return <StatsDashboard />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setActivePage={setActivePage} />
      <main style={{ flex: 1, padding: "20px", marginLeft: "260px" }}>
        {renderContent()}
      </main>
    </div>
  );
}
