import  { useState } from "react";
import "../styles/signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/mainpage");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="app-wrapper">
      <div className="helpdesk-container">
        <h1 className="helpdesk-title">Helpdesk System</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" style={{ backgroundColor: "green" }}>
            Sign In
          </button>

          <div className="redirect">
            <Link to="/signup" style={{ color: "black" }}>
              Sign Up
            </Link>
          </div>

          {error && (
            <p style={{ color: "red", marginTop: "15px", fontWeight: "bold" }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signin;