import React, { useEffect } from "react";
import Footer from "./footer";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
import { getupdate, updatepost } from "./api/endpoint";
import { IoMdArrowRoundBack } from "react-icons/io";
import Upperhead from "./upperhead";

const Updatepost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [err, setErr] = useState({});
  const getdata = async () => {
    const res = await getupdate(id);
    setFormData({
      title: res.data.title,
      description: res.data.description,
      image: res.data.image,
    });
  };
  useEffect(() => {
    getdata();
  }, [id]);
  const notify = () => toast("Blog Updated Sucessfully");
  const handleSubmited = async () => {
    const error = {};
    if (!formData.title.trim()) {
      error.title = "title is required*";
    }
    if (!formData.description.trim()) {
      error.description = "description is required*";
    }
     else if (Object.keys(error).length === 0) {
      try {
        await updatepost(formData, id);
        // alert("Blog Updates Sucessfully");

        // <Alert severity="error">Blog update Sucessfull</Alert>;

        navigate("/createblog");
      } catch {
        setErr(error);
      }
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({ ...formData, image: file }); // Update the state with the file
  };

  return (
    <>
      <Upperhead />
      <div className="container2 middle-part">
        <div className="blog1">
          <div
            className="backicon"
            onClick={() => {
              navigate("/createblog");
            }}
          >
            <IoMdArrowRoundBack />
          </div>
          Update Post
        </div>
        <div className="create-p">
          <div className="ip">Update Your Post</div>
          <div className="ip1">
            <input
              className="b"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter title"
            ></input>
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
              onChange={(e) => handleFileChange(e)}
            />
            <div className="img-msg">
              {err.image && <span className="error msg">{err.image}</span>}
            </div>
          </div>
          <div className="post-done">
            <button
              className="post-btn"
              onClick={() => {
                handleSubmited();
                notify();
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Updatepost;
