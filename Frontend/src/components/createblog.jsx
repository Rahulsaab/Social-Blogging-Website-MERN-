import React, { useEffect, useState } from "react";
import Header from "./lowerheader";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { getData } from "./api/endpoint";
import Post from "./Post";
import Upperhead from "./upperhead";

const Createblog = () => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const [getdata, setGetdata] = useState([]);
  const [loading, setLoading] = useState(true); 

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchdata = async () => {
    setLoading(true); // Start loading
    try {
      const res = await getData();
      if (res.data) {
        setGetdata(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchdata();
  }, [render]);

  return (
    <>
      <Upperhead />
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
          {loading ? (
            <div className="loading " style={{margin:"0px auto", maxWidth:'fit-content', padding:"10rem"}}><section className="dots-container">
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </section>
          </div>
          ) : getdata.length > 0 ? (
            getdata.map((item, index) => (
              <Post
                key={index}
                item={item}
                fetchdata={fetchdata}
                render={render}
                setRender={setRender}
              />
            ))
          ) : (
            <div className="no-blog">No Blog Posted!</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Createblog;
