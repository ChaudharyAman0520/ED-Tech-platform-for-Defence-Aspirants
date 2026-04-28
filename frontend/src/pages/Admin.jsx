import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../style/Admin.css";


import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import QuestionArsenal from "./QuestionArsenal";
import TestSimulator from "./TestSimulator";
import { CadetDatabase, AnalyticsPage, ContentOps, SettingsPage } from "./AdminPages";

function renderPage(page, navigate) {
  switch (page) {
    case "dashboard": return <AdminDashboard onNavigate={navigate} />;
    case "questions": return <QuestionArsenal />;
    case "tests": return <TestSimulator />;
    case "aspirants": return <CadetDatabase />;
    case "analytics": return <AnalyticsPage />;
    case "content": return <ContentOps />;
    case "settings": return <SettingsPage />;
    default: return <AdminDashboard onNavigate={navigate} />;
  }
}

export default function Admin() {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");


    if (!token || !user) {
      navigate("/login");
      return;
    }

    if (user.role !== "ADMIN") {
      navigate("/");
      return;
    }


  }, [navigate]);

  const handleNavigate = (page) => {
    if (page === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }
    setActivePage(page);
  };

  return ( <AdminLayout activePage={activePage} onNavigate={handleNavigate}>
        {renderPage(activePage, handleNavigate)} </AdminLayout>
  );
}