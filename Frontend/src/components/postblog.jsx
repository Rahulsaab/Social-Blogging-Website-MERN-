import React, { useState } from "react";
import Footer from "./footer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { addblog } from "./api/endpoint";
import { IoMdArrowRoundBack } from "react-icons/io";
import Upperhead from "./upperhead";

const Postblog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [err, setErr] = useState({});

  const handleSubmited = async () => {
    const error = {};

    if (!formData.title.trim()) {
      error.title = "Title is required*";
    }
    if (!formData.description.trim()) {
      error.description = "Description is required*";
    }

    setErr(error);

    if (Object.keys(error).length === 0) {
      try {
        console.log("Submitting formData: ", formData); 
        const imgData = new FormData();
        imgData.append("title", formData.title);
        imgData.append("description", formData.description);
        imgData.append("image", formData.image);

        const res = await addblog(imgData);
        console.log("Response from addblog: ", res); 
        toast.success("Blog Posted successfully!");
        navigate("/createblog");
      } catch (err) {
        console.error("Error posting blog: ", err); 
        toast.error("Error posting blog");
      }
    }
  };

  return (
    <>
      <Upperhead />
      <div className="container2 middle-part">
        <div className="blog1">
          <div className="backicon" onClick={() => navigate("/createblog")}>
            <IoMdArrowRoundBack />
          </div>
          Blog Post
        </div>
        <div className="create-p">
          <div className="ip">Create a Post</div>
          <div className="ip1">
            <input
              className="b"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter title"
            />
            <div className="err-msg">
              {err.title && <span className="error msg">{err.title}</span>}
            </div>
          </div>
          <div className="ip1">
            <textarea
              className="b"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
            <div className="err-msg">
              {err.description && (
                <span className="error msg">{err.description}</span>
              )}
            </div>
          </div>
          <div className="ip2">
            <input
              className="image-up"
              type="file"
              placeholder="Upload Image"
              onChange={(e) => {
                if (e.target.files.length) {
                  const selectedFile = e.target.files[0];
                  setFormData({ ...formData, image: selectedFile });
                } else {
                  setFormData({ ...formData, image: "" });
                }
              }}
            />
            <div className="img-msg">
              {err.image && <span className="error msg">{err.image}</span>}
            </div>
          </div>
          <div className="post-done">
            <button className="post-btn" onClick={handleSubmited}>
              Post
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Postblog;
