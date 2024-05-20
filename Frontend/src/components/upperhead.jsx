import React from 'react'
import "../componentCss/figma.css";
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateloginfo } from "./api/endpoint";
const Upperhead = () => {
    // const [alltile, setAlltile]=useState()
    const [profile, setProfiledata] = useState({});
    const ProfileID = localStorage.getItem("userId");
  
    const handlesave = async () => {
      const res = await updateloginfo(ProfileID);
      setProfiledata(res.data.user);
    };
    useEffect(() => {
      handlesave();
    }, []);
    const navigate = useNavigate();
  return (
    <>
    <header className="head">
        <div className="top-header">
          <div className="header">
            <div className="left-side">
              <img className="travel-icon" src="2461656.jpg" alt="" />
              <div className="main-head">Traveler's Trails</div>
            </div>
            <div className="right-side">
              <img
                className="pfp"
                src={`https://social-blog-api-r3az.onrender.com/${profile.profilePhoto}`}
                alt=""
              />
              <select
                className="sel-name"
                onClick={() => {
                  navigate("/editinfo");
                }}
                name={profile.userName}
              >
                <option value="" disabled="" selected="">
                  {profile.userName}
                </option>
              </select>
            </div>
          </div>
        </div>
    </header>   
    </>
  )
}

export default Upperhead
