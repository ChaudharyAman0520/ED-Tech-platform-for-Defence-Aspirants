import React, { useState } from "react";
import { Home, NDAManager, SSBManager, MissionManager, ExamManagementPage, UsersManagementPage } from "./AdminPages";

const AdminDashboard = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case "home": return <Home />;
      case "nda": return <NDAManager />;
      case "ssb": return <SSBManager />;
      case "missions": return <MissionManager />;
      case "exam": return <ExamManagementPage />;
      case "users": return <UsersManagementPage />;
      default: return <Home />;
    }
  };

  return (
    <div className="admin-content-area">
      {renderContent()}
    </div>
  );
};

export default AdminDashboard;