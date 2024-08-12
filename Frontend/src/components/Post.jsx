import React, { useState } from "react";
import { MdEditNote } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { deletecomment, deletepost } from "./api/endpoint";
import { RxCrossCircled } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import { UpdateWithPatch } from "./api/endpoint";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { TbSquareRoundedArrowUpFilled } from "react-icons/tb";
import { CommentDo } from "./api/endpoint";
import { useEffect } from "react";
import { updateloginfo } from "./api/endpoint";

const Post = ({ item, fetchdata, render, setRender }) => {
  const [docomment, SetDocomment] = useState({
    comment: "",
  });
  const [profile, setProfiledata] = useState({});
  const ProfileID = localStorage.getItem("userId");

  const handlesave = async () => {
    const res = await updateloginfo(ProfileID);
    setProfiledata(res.data.user);
  };
  useEffect(() => {
    handlesave();
  }, []);
  const comment = async (id) => {
    try {
      await CommentDo(docomment, id);
      
      setRender(!render);
      toast.info("Comment posted")
    } catch (err) {
      console.log(err);
    }
  };
  const commentdelete = async (id, commentId) => {
    try {
      const res = await deletecomment(id, commentId);
      console.log(res.data)
      fetchdata();
      toast.info("Comment deleted")
    } catch (err) {
      console.log(err, "error in cmnt dlt");
    }
  };
  const togglelike = async (postId) => {
    await UpdateWithPatch({ liked: !item.liked }, postId);
    setRender(!render);
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const createdDate = new Date(item.created_Date);
  let day = createdDate.getDate();
  let monthindex = createdDate.getMonth();
  let month = months[monthindex];
  let year = createdDate.getFullYear();
  let currentdate = `${day} ${month} ${year}`;

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deletepost(id);
      fetchdata();
      toast.info("Blog deleted")
    } catch (err) {
      console.log(err);
      toast.error("Fail to delete blog")
    }
  };
  return (
    <>
      <div className="display1" key={item._id}>
        <img
          className="thumbnail"
          src={`https://social-blog-api-r3az.onrender.com/${item.image}`}
          alt="ndsn "
        />
        <div className="about">{item.title} </div>
        <div className="desc">{item.description}</div>
        <div className="desc"></div>
        <div className="logo-info">
          <div className="logo">
            <img
              className="author"
              src={`https://social-blog-api-r3az.onrender.com/${profile.profilePhoto}`}
              alt="xyz"
            />
          </div>
          <div className="author-name">
            {profile.userName}
            <span className="date">
              <br /> {currentdate}
            </span>
          </div>
        </div>
        <div className="like-comment-sec">
          <div className="lc">
            {item.liked ? (
              <FaHeart
                className="like-btn small-heart"
                style={{ color: "red" }}
                onClick={() => {
                  togglelike(item._id);
                }}
              />
            ) : (
              <FaRegHeart
                className="like-btn small-heart"
                onClick={() => {
                  togglelike(item._id);
                }}
              />
            )}{" "}
            Like
          </div>

          <Popup
            contentStyle={{
              width: "250px",
              borderRadius: "10px",
              backgroundColor: "beige",
            }}
            trigger={
              <div className="lc">
                {" "}
                <FaRegCommentDots /> Comment
              </div>
            }
            position="bottom center"
          >
            <div>
              <div>
                {item.comments.length ? (
                  <span>
                    {item.comments.map((showcomment) => {
                      return (
                        <div style={{width:"220px", display:"flex" , justifyContent:"space-between" , paddingBottom:"6px"}}>
                          <div style={{paddingLeft:"1rem"}}>
                            {showcomment.comment}</div>
                            <div className="dltcmnt"  onClick={() =>{ commentdelete(item._id,showcomment._id);console.log(item._id,showcomment._id,"ertcvy")}}><RxCrossCircled /></div>
                          
                        </div>
                      );
                    })}
                  </span>
                ) : (
                  <span>no comment</span>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "-15px",
                }}
              >
                <div className="logo9">
                  <img
                    className="author1"
                    src={`https://social-blog-api-r3az.onrender.com/${profile.profilePhoto}`}
                    alt="abc"
                  />
                </div>

                <input
                  style={{ width: "170px", height: "30px" }}
                  type="text"
                  placeholder="Enter Comment"
                  value={docomment.comment}
                  onChange={(e) =>
                    SetDocomment({ ...docomment, comment: e.target.value })
                  }
                  className="comment-bar"
                ></input>

                <div
                  style={{
                    display: "block",
                    alignContent: "center",
                    paddingTop: "3px",
                  }}
                >
                  <TbSquareRoundedArrowUpFilled
                    style={{ fontSize: "30px", paddingBottom: "15px" }}
                    onClick={() => comment(item._id)}
                  />
                </div>
              </div>
            </div>
          </Popup>
          <Popup>
            trigger={
          <div className="lc">
            <FaRegShareSquare /> Share{" "}
          </div>}
          </Popup>
        </div>
        <div className="two-icons">
          <button className="know-btn" onClick={()=>navigate(`/detail/${item._id}`)}>Full Post</button>
          <div className="update-delete">
            <div
              className="update"
              onClick={() => navigate(`/updatePost/${item._id}`)}
            >
              <MdEditNote />
            </div>
            <div
              className="dlt"
              onClick={() => {
                handleDelete(item._id);
                
              }}
            >
              <MdDeleteSweep />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
