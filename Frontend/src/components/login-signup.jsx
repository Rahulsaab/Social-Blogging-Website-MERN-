import React, { useState } from "react";
import "../componentCss/lognsign.css";
import { Link, useNavigate } from "react-router-dom";
import { logindetail } from "./api/endpoint";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loginsignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handlesubmit = async () => {
    const error = {};
    if (!formData.email.trim()) {
      error.email = "Email is required";
    }
    if (!formData.password.trim()) {
      error.password = "Password is required";
    }

    setError(error);

    if (Object.keys(error).length === 0) {
      try {
        const res = await logindetail(formData);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          toast.success("Login successful!");
          navigate("/createblog");
        }
      } catch (err) {
        toast.error("Login failed! Please check your credentials and try again.");
      }
    }
  };

  return (
    <div className="cont-log" id="cont-log">
      <div className="auth-container">
        <div className="form-container sign-in-container">
          <main className="main-log">
            <h1>Login In</h1>
            <input
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
            {error.email && <span className="error msg">{error.email}</span>}
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
            />
            {error.password && (
              <span className="error msg">{error.password}</span>
            )}
            <div
              className="forgot-pass"
              style={{ fontSize: "15px" }}
              onClick={() => {
                navigate("/forgotpass");
              }}
            >
              Forgot Password?
            </div>
            <button onClick={handlesubmit}>Login In</button>
          </main>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>Welcome to Figma</h1>
              <p>
                Register with your personal details to use all of site features
              </p>
              <Link to="/signup" className="sign">
                <button className="hidden" id="register">
                  Sign up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;
