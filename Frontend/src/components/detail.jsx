import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getupdate, CommentDo, deletecomment } from "./api/endpoint";
import { MdDelete } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import Upperhead from "./upperhead";
import Footer from "./footer";
import "../componentCss/figma.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogDetail = () => {
  const { id } = useParams(); // Get blog id from URL
  const [blogdetaildata, setBlogdetaildata] = useState([]);
  const [docomment, setDocomment] = useState({
    comment: "",
  });
  const [render, setRender] = useState(false);

  const notify = () => toast("Blog Updated Successfully");

  const fetchBlogDetail = async () => {
    try {
      const res = await getupdate(id); // Fetch blog details using the blog id
      setBlogdetaildata(res.data);
    } catch (err) {
      console.log("Error fetching blog details", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (docomment.comment.trim()) {
      try {
        await CommentDo(docomment, id);
        setRender(!render);
        fetchBlogDetail();
        setDocomment({ comment: "" });
        notify();
      } catch (err) {
        console.log("Error posting comment", err);
      }
    }
  };

  const commentdelete = async (id, commentId) => {
    try {
      await deletecomment(id, commentId);
      fetchBlogDetail();
    } catch (err) {
      console.log("Error deleting comment", err);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [render]);

  return (
    <>
      {/* <Upperhead /> */}
      <div className="abt-blog">Full Blog</div>
      <div className="detail-page" >
        <div className="forcol">
          <div className="detail-page-main-image">
            <img
              className="detail-page-main-img"
              src={`https://social-blog-api-r3az.onrender.com/${blogdetaildata.image}`}
              alt={blogdetaildata.title}
            />
          </div>
          <div className="detail-page-main-content">
            <div className="detail-page-main-title">{blogdetaildata.title}</div>
            <div className="detail-page-main-description">
              {blogdetaildata.description}
            </div>
          </div>
        </div>

        <div className="main-div-comment">
          <div className="card">
            <div className="chat-header">Comments</div>
            <div className="chat-window">
              <ul className="message-list">
                {blogdetaildata.comments?.length ? (
                  blogdetaildata.comments.map((showcomment) => (
                    <div className="blogdetail-page-show-comment" key={showcomment._id}>
                      <div>{showcomment.comment}</div>
                      <div>
                        <MdDelete
                          onClick={() =>
                            commentdelete(blogdetaildata._id, showcomment._id)
                          }
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="blogdetail-div-nocomment">
                    <span>No comments yet</span>
                  </div>
                )}
              </ul>
            </div>
            <div className="chat-input">
              <input
                type="text"
                className="message-input"
                placeholder="Type your comment here"
                value={docomment.comment}
                onChange={(e) =>
                  setDocomment({ ...docomment, comment: e.target.value })
                }
              />
              <button
                className="send-button"
                onClick={handleCommentSubmit}
              >
                <RiSendPlaneFill />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default BlogDetail;
