import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/pages/admin.css";
import AdminLayout from "./AdminLayout";
import { 
  AdminHome, 
  NDAManager, 
  SSBManager, 
  MissionManager, 
  ExamManagementPage, 
  QuestionBankPage,
  PYQPage,  
  TestResultsPage, 
  UsersManagementPage 
} from "./AdminPages";

export default function Admin() {
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "ADMIN") navigate("/");
    } catch { navigate("/login"); }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <AdminHome />;
      case "content":   return <NDAManager />;
      case "ssb":       return <SSBManager />;
      case "missions":  return <MissionManager />;
      case "exams":     return <ExamManagementPage />;
      case "users":     return <UsersManagementPage />;
      case "question-bank": return <QuestionBankPage />;
      case "pyq": return <PYQPage />;        
      case "test-results": return <TestResultsPage />; 
      default:          return <AdminHome />;
    }
  };

  const handleNavigate = (page) => {
    if (page === "logout") {
      handleLogout();
    } else {
      setActivePage(page);
    }
  };

  return (
    <AdminLayout activePage={activePage} onNavigate={handleNavigate}>
      {renderPage()}
    </AdminLayout>
  );
}