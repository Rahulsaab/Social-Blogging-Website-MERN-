import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import Loginsignup from "./components/login-signup";
import Signup from "./components/signup";
import Createblog from "./components/createblog";
import { ToastContainer } from 'react-toastify';
import Postblog from "./components/postblog";
import Updatepost from "./components/updatePost";
import UserInformation from "./components/editinfo";
import Forgotpass from "./components/forgotpass";
import Newpass from "./components/newpass";
import Blogdetail from "./components/detail";
// import YouTubeLayout from "./components/yt";
// import Upperhead from "./components/upperhead";
const App1 = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/createblog")
    }
    
  }, [token]);

  return (
    <>
    <ToastContainer />
    <Routes>
    <Route path="/createblog" element={<Createblog/>}></Route>
    <Route path="/" element={<Loginsignup/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/postblog" element={<Postblog/>}></Route>
    <Route path="/updatePost/:id" element={<Updatepost/>}></Route>
    <Route path="/editinfo" element={<UserInformation/>}></Route>
    <Route path="/forgotpass" element={<Forgotpass/>}></Route> 
    <Route path="/login-signup" element={<Loginsignup/>}></Route> 
    <Route path="/newpass/:email" element={<Newpass/>}></Route> 
    <Route path="/detail/:id" element={<Blogdetail/>}></Route> 
    </Routes>
    </>
  )
} 
function App() {

  return (
    <>
    
    <BrowserRouter>
    <App1/>
    {/* <Forgotpass/> */}
    </BrowserRouter>

    </>

  );
}

export default App;
