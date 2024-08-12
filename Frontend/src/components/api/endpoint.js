import axios from "axios";

const BASE_URL = "https://social-blogging-website-mern-fe.onrender.com";
const token = localStorage.getItem("token");

const API = axios.create({
  baseURL: BASE_URL,
 headers: {
    Authorization: `Bearer ${token}`,
    // "Content-Type": "application/json",
  }
});

export const addblog = (data) => API.post("/post/createpost", data);
export const getData = () => API.get("/post/createpost");
export const signupdetail = (signupdata) => API.post("/auth/signup", signupdata);
export const logindetail = (logindata) => API.post("/auth/login", logindata);
export const deletepost = (id) => API.delete(`/post/createpost/${id}`);
export const getupdate = (id) => API.get(`/post/createpost/${id}`);
export const updatepost = (formData, id) => API.put(`/post/createpost/${id}`, formData);
export const UpdateWithPatch = (updated, id) => API.patch(`/post/update/${id}`, updated);
export const CommentDo = (comment, id) => API.post(`/post/createpost/${id}/comment`, comment);
export const deletecomment = (id, commentId) => API.delete(`/post/createpost/${id}/comment/${commentId}`);
export const updateloginfo = (userId) => API.get(`/auth/profile/${userId}`);
export const getprofile = (profiledata, userId) => API.put(`auth/profile/${userId}`, profiledata);
export const changeprofile = (profileupdate, userId) => API.patch(`/auth/profile/${userId}`, profileupdate);
export const checkemail = (email) => API.post(`/auth/sendmail`, email);
export const resetpassword = (email, resetpassdata) => API.post(`/auth/resetpass/${email}`, resetpassdata);
export const filterAPI = (title, created_Date) => API.get(`/post/filter?title=${title}&created_Date=${created_Date}`);
export const searchApi = (searchdata) => API.get(`/post/search?searchtext=${searchdata}`);
