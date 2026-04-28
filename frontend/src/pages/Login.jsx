import { useState } from "react";
import { loginUser } from "../service/authService.js";
import { saveToken } from "../utils/tokens.js";
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/jwt.js";
import "../style/Login.css";

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser(email, password);

            const token = data.token;

            // Save token
            saveToken(token);

            // Decode user from token
            const user = getUserFromToken(token);

            // Store user
            localStorage.setItem("user", JSON.stringify(user));

            // Navigate based on role
            if (user.role?.toUpperCase() === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        } catch (err) {
            console.log(err);
            setError("Invalid credentials or server error");
        }
    };

    return (
        <div id="login-page">

            <video autoPlay loop muted playsInline className="bg-video">
                <source src="/soldier.mp4" type="video/mp4" />
            </video>

            <div className="video-overlay"></div>

            <div className="login-box">

                <h1 className="login-title">Secure Access</h1>
                <p className="login-sub">
                    Enter your credentials to continue your mission.
                </p>

                <form onSubmit={handleLogin} className="login-form">

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>

                    {error && <p className="error-text">{error}</p>}
                </form>

            </div>
        </div>
    );
};

export default Login;