import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import '../componentCss/figma.css'
const Footer=()=>{
    return(
        <>
        <footer className="footer">
    <div className="container3">
      <div className="blog-part">
        <div className="taining-blog">
          Travel <span className="blog-baseline">Blog</span>
        </div>
        <div className="blog-content">
          Welcome To Our Technical Blog, Where We Delve Into The World Of
          Cutting Edge Technologies And Explore Their Practical Applications
        </div>
      </div>
      <div className="category-part">
        <div className="category">QUICK LINKS</div>
        <div className="list">
          <ol>HOME</ol>
          <ol>CREATE POST</ol>
          <ol>PROFILE</ol>
          <ol>LOGOUT</ol>
        </div>
      </div>
      <div className="get-in-touch-part">
        <div className="contact"> GET IN TOUCH</div>
        <div className="contact-info">
          <ol>+91-8XXX-XXX-XX</ol>
          <ol>rahulpa424@gmail.com</ol>
        </div>
      </div>
      <div className="follow">
        <div className="follow-us">FOLLOW US ON</div>
        <div className="social-icons">
        <FaTwitter /> <span className="icon-name">Twitter</span><br></br>
        <FaLinkedin /> <span className="icon-name">Linked in</span> <br></br>
        <FaInstagram /> <span className="icon-name">Instagram</span>
        </div>
      </div>
    </div>
    <div className="end-blog">
      <div className="container4">
        <div className="end-left">
        <FaRegCopyright />
          <i className="fa-regular fa-copyright" />
          2024 TRAININGBLOG
        </div>
        <div className="end-right"><FaHeart /> MADE BY RAHUL, MOHALI INDIA</div>
      </div>
    </div>
  </footer>
        </>
    )
}
export default Footer