import { useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { checkemail } from "./api/endpoint";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgotpass = () => {
  const notify = () => toast("Email sent sucessfully");
  const navigate = useNavigate();
  const[emailsend, setEmailsend]=useState({
    email:""})
  const fetchforgotdata= async()=>{
    try{
      const res=await checkemail(emailsend)
      console.log(res)
    }catch(err){
      console.log(err,"dfgh")
    }
  }
  return (
    <div>
      <div className="cont-main">
        <div className="cont-inside">
          <div style={{ fontSize: "50px",paddingTop:"30px" }}>
            <FaCircleExclamation />
          </div>
          <div className="line-h2">
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bolder",
              textDecoration: "underline",
              color: "#512da8",
            }}
          >
            Forgot Password
          </div>
          <div style={{ width: "380px", margin: "0px auto" }}>
            Enter your email and we will send you a link to reset your
            password
          </div>
          <div>
            <input
              style={{
                width: "300px",
                height: "35px",
                borderRadius: "12px",
                border: "none",
                // backgroundColor: "#ccc",
              }}
              
              type="text"
              placeholder="enter email"
              onChange={(e)=>setEmailsend({...emailsend,email:e.target.value})}
            />
          </div>
          <div>
            <button 
            
              style={{
                width: "70px",
                height: "30px",
                border: "none",
                borderRadius: "12px",
                backgroundColor: " #512da8",
                color: "white",
              }}
              onClick={()=>{fetchforgotdata();notify()}}
            >
              Submit
            </button>
          </div>
          <div
            onClick={() => {
              navigate("/login-signup");
            }}
          >
            Back to Login
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpass;
