import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    if (roleRequired && payload.role !== roleRequired) {
      return <Navigate to="/" />;
    }

    return children;
  } catch (err) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }
}