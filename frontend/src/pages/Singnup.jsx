import axios from "axios";
import "../styles/auth.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ signupDetails, setSignupDetails }) => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/signup`,
        {
          fullname: signupDetails.fullname,
          email: signupDetails.email,
          password: signupDetails.password,
        }
      );

      if (res.data) {
        alert("Signup successful!");
        navigate("/");
      }
    } catch (error) {
      // Improved error logging
      console.log("Full error object:", error);
      console.log("Response data:", error.response?.data);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              name="fullname"
              value={signupDetails.fullname}
              onChange={handleChange}
              type="text"
              id="fullname"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={signupDetails.email}
              onChange={handleChange}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={signupDetails.password}
              onChange={handleChange}
              type="password"
              id="password"
              placeholder="Create a password (min 6 characters)"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
