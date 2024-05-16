import React from "react";
import Header from "./lowerheader";
import Footer from "./footer";
import { useState } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { addblog } from "./api/endpoint";
import { IoMdArrowRoundBack } from "react-icons/io";
import Upperhead from "./upperhead";
const Postblog = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const notify = () => toast("Blog Updated Sucessfully");
  const [err, setErr] = useState({});
  const handleSubmited = async () => {
    const error = {};
    if (!formData.title.trim()) {
      error.title = "title is required*";
    }
    if (!formData.description.trim()) {
      error.description = "description is required*";
    }
     else if (Object.keys(error).length === 0) {
      try{
        const imgData= new FormData()
        imgData.append("title",formData.title)
        imgData.append("description",formData.description)
        imgData.append("image",formData.image)
       const res= await addblog(imgData);
      // alert("Blog Posted Sucessfully");
      console.log(res)
       navigate("/createblog");
      }
      catch(err){
        setErr(error);
      }
    }
   
  }


  return (
    <>
      <Upperhead />
      <div className="container2 middle-part">
        <div className="blog1" >
        <div className="backicon" onClick={() => {
                navigate("/createblog")}}><IoMdArrowRoundBack /></div>
          Blog Post
        
        </div>
        <div className="create-p">
          <div className="ip">Create a Post</div>
          <div className="ip1">
            <input className="b" type="text" value={formData.title} onChange={ (e)=>setFormData({ ...formData, title: e.target.value })} placeholder="Enter title"></input>
            <div className="err-msg">{err.title && 
              <span className="error msg">{err.title}</span>
            }</div>
          </div>
          <div className="ip1">
            <textarea
              className="b"
              type="text"
              placeholder="Enter description"
              value={formData.description} 
              onChange={ (e) =>setFormData({ ...formData, description: e.target.value })}
            ></textarea>
            <div className="err-msg">{err.description && 
              <span className="error msg">{err.description}</span>
            }</div>
          </div>
          <div className="ip2">
            <input
              className="image-up"
              type="file"
              placeholder="Upload Image"
              onChange={(e) =>{
                if(e.target.files.length){
                  const selectfile= e.target.files[0]
                  setFormData({ ...formData, image:selectfile})
                }
                else{
                  setFormData({ ...formData, image:{}})
                }
              }}
            ></input>
            <div className="img-msg">{err.image && 
              <span className="error msg">{err.image}</span>
            }</div>
          </div>
          <div className="post-done">
            <button className="post-btn" onClick={()=>{handleSubmited() ; notify()}}>Post</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Postblog;
