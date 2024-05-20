import React from "react";
import Upperhead from "./upperhead";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { getupdate } from "./api/endpoint";
import "../componentCss/figma.css";
import { CommentDo,deletecomment } from "./api/endpoint";
import { MdDelete } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
const Detail = () => {
  const { id } = useParams();
  const [blogdetaildata, setBlogdetaildata] = useState([]);
  const notify = () => toast("Blog Updated Successfully");
  const [errors, setErrors] = useState({});
  const handleget = async () => {
    try{
    const res =  await getupdate(id);
    setBlogdetaildata(res.data);
    }catch(err){
      console.log(err)
    }
  };
  console.log(blogdetaildata);
  const [render, setRender] = useState(false);
  const [docomment, setDocomment] = useState({
    comment: "",
});
  const comments = async (id) => {
    try {
      await CommentDo(docomment, id);
      // alert("comment successfully");
      setRender(!render);
      handleget();
    } catch (error) {
      console.log(error);
    }
  };
  const commentdelete = async (id, commentId) => {
    try {
      await deletecomment(id, commentId);
      handleget();
    } catch (err) {
      console.log(err, "error in delete comment api");
    }
  };
  
  console.log(blogdetaildata);
useEffect(()=>{
  handleget()
},[])
  return (
    <>
      {/* <Upperhead></Upperhead> */}
      <div className="abt-blog">Blog Detail</div>
      <div className="main-div-detail-page">
        <div className="forcol">
          
          <div className="detail-page-main-image">
            <img
              className="detail-page-main-img"
              src={`https://social-blog-api-r3az.onrender.com/${blogdetaildata.image}`}
              alt=""
            />
          </div>
          <div className="detail-page-main-content">
            <div className="detail-page-main-title">{blogdetaildata.title}</div>

            <div className="detail-page-main-description">
              {blogdetaildata.description}
            </div>

            {/*    
              <div>About blog</div> */}
          </div>
        </div>
        <div className="main-div-comment">
        <div class="card">
    <div class="chat-header">Comment</div>
      <div class="chat-window">
        <ul class="message-list">{blogdetaildata.comments?.length ? (
                <div>
                  {blogdetaildata.comments.map((showcomment) => {
                    return (
                      <div className="blogdetail-page-show-comment">
                        <div>{showcomment.comment}</div>
                        <div>
                          <MdDelete
                            onClick={() =>
                              commentdelete(blogdetaildata._id, showcomment._id)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div  className="blogdetail-div-nocomment">
                  <span >no comment</span>
                </div>
              )}</ul>
      </div>
      <div class="chat-input">
          <input type="text" class="message-input" placeholder="Type your message here"  value={docomment.comment}
              onChange={(e) =>
                setDocomment({ ...docomment, comment: e.target.value })
                
              }/>
          <button class="send-button" onClick={() => comments(blogdetaildata._id)}>Send</button>
      </div>
    </div>
        </div>
      </div>
    </>
  );
};
export default Detail;