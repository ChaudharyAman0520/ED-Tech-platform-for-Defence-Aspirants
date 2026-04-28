import { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../style/pages/register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      console.log("Registering:", form);

      const res = await register(form);

      console.log("Response:", res);

      setMessage("Registration successful ✅");

      // redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.error(err);

      // 🔥 Proper backend error handling
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="register-page">

      {/* VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/soldier.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="video-overlay"></div>

      {/* REGISTER BOX */}
      <div className="reg-box">

        <h1 className="reg-title">Join the Force</h1>
        <p className="reg-sub">
          Create your account and begin your journey.
        </p>

        <form onSubmit={handleRegister} className="reg-form">

          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="reg-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}

        </form>
      </div>
    </div>
  );
};

export default Register;