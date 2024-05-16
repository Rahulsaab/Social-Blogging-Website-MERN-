import React, { useEffect, useState } from "react";
import Header from "./lowerheader";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { getData } from "./api/endpoint";


import Post from "./Post";
import Upperhead from "./upperhead";
const Createblog = () => {
  const navigate = useNavigate();
  const [render,setRender]= useState(false)
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  // const notify = () => toast("Blog Deleted Sucessfully");
  const [getdata, setGetdata] = useState([]);
  const fetchdata = async () => {
    try {
      const res = await getData();
      if (res.data) {
        setGetdata(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchdata();
  }, [render]);

  return (
    <>
      <Upperhead/>
      <Header setGetdata={setGetdata}></Header>
      <div className="container2 middle-part">
        <div className="blog">
          Blog Post
          <div className="post-log">
            <button
              className="postbtn"
              onClick={() => {
                navigate("/postblog");
              }}
            >
              Create Post
            </button>

            <button
              className="postbtn"
              onClick={() => {
                logout();
              }}
            >
              LogOut
            </button>
          </div>
        </div>
        <div className="all-post">
          {getdata.map((item, index) => {
            return <Post item={item} fetchdata={fetchdata} render={render} setRender={setRender}/>;
          })}
        </div>

        {/* <div className="no-blog">No Blog Posted!</div> */}
      </div>
      <Footer />
    </>
  );
};

export default Createblog;
