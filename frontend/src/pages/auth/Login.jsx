import { useState } from "react";
import { login } from "../../services/authService";
import { Link } from "react-router-dom";
import "../../style/pages/login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login(form);

      localStorage.setItem("token", res.token);

      const payload = JSON.parse(atob(res.token.split(".")[1]));

      if (payload.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login-page">

      {/* VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/soldier.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="video-overlay"></div>

      {/* LOGIN BOX */}
      <div className="login-box">

        <h1 className="login-title">Login</h1>
        <p className="login-sub">
          Access your account and continue your journey.
        </p>

        <form onSubmit={handleSubmit} className="login-form">

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error-text">{error}</p>}

        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}