import React, { useState } from "react";
import { RiRotateLockFill } from "react-icons/ri";
import {useParams } from "react-router-dom"
import { resetpassword} from "./api/endpoint";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Newpass = () => {
  // const navigate=useNavigate()
  const notify = () => toast("Password Reset Sucessfully");
  const [resetpass,setResetpass]=useState({
    newPassword:""
  })
  const getemail=useParams()
  console.log(getemail)
  const mail=getemail.email
  console.log(mail)
  const fetchresetpass=async()=>{
    try{
      const res= await resetpassword(mail,resetpass)
      console.log(res)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
      <div className="cont-main">
        <div className="cont-inside1">
          <div style={{ fontSize: "70px",paddingTop:"20px" }}>
            <RiRotateLockFill />
          </div>
        <div className="line-h"> 
          <div
            style={{
              fontSize: "30px",
              fontWeight: "bolder",
              textDecoration: "underline",
              color: "#512da8",
            }}
          >
            Reset Password
          </div>
          <div style={{ width: "380px", margin: "0px auto" }}>
            Enter your email and we will send send you a link to reset your
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
              type="password"
              placeholder="new password"
              value={resetpass.newPassword}
              onChange={(e)=>setResetpass({...resetpass,newPassword:e.target.value})}
            />
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
              type="password"
              placeholder="confirm password"
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
              onClick={()=>{fetchresetpass();notify()}}
            >
              Submit
            </button>
          </div>
          {/* <div
            onClick={() => {
              navigate("/login-signup");
            }}
          >
            Back to Login
          </div> */}
        </div>   
        </div>
      </div>
    </>
  );
};

export default Newpass;
