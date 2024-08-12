import React from "react";
import { Link } from "react-router-dom";
import "../componentCss/figma.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { signupdetail } from "./api/endpoint";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const handleSubmit = async () => {
    const error = {};
    if (!formData.userName.trim()) {
      error.userName = "Name is required";
    }
    if (!formData.email.trim()) {
      error.email = "Email is required";
    }
    if (!formData.password.trim()) {
      error.password = "Password is required";
    }
    if (!formData.confirmPassword.trim()) {
      error.confirmPassword = "Confirm password is required";
    } 
    else if (Object.keys(error).length === 0) {
      try {
        await signupdetail(formData)
        // alert("Signup Sucessfully")
        toast.success("Signup Sucessfully")
        navigate("/");
      } 
      catch (err) {
        toast.error("Signup failed:", err);
      }
    }
      setErrors(error);
    
  };

  return (
    <div className="cont-log" id="cont-log">
      <div className="auth-container">
        <div className="form-container sign-up"></div>
        <div className="form-container sign-in-container">
          <main >
            <h1>Sign Up</h1>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              placeholder="Name"
            />
            {errors.userName && 
              <span className="error msg">{errors.userName}</span>
            }
            <input
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />
            {errors.email && <span className="error msg">{errors.email}</span>}
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
            />
            {errors.password && 
              <span className="error msg">{errors.password}</span>
            }
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && 
              <span className="error msg">{errors.confirmPassword}</span>
            }
            <button type="submit" onClick={() => {handleSubmit() }} >
              Sign Up
            </button>
          </main>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left"></div>
            <div className="toggle-panel toggle-right">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <Link to="/" className="sign">
                <button className="hidden" id="login">
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
