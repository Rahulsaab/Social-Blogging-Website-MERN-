import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { upload } from "../middleware/filleUpload.js";
import nodemailer from "nodemailer";

const authRouter = express.Router();
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "user not exist" });
  }
  const matchPassword = await bcrypt.compare(password, existingUser.password);

  if (!matchPassword) {
    return res.status(400).json({ message: "Invalid Password" });
  }
  const token = jwt.sign(
    { userId: existingUser._id },
    process.env.JWT_SECRET_KEY
  );
  const userId = existingUser._id;
  console.log(userId);
  res.status(200).json({ message: "Login sucessfully", token, userId });
  console.log(token);
});

authRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const saltvalue = 10;
    const hashPassword = await bcrypt.hash(password, saltvalue);
    const user = new User({
      userName,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "User Created Sucessuflly" });
  } catch (err) {
    console.log(err);
  }
});

// PROFILE UPDATE

authRouter.put("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const { userName, email, country, state, pincode } = req.body;
    user.userName = userName || user.userName;
    user.country = country || user.country;
    user.state = state || user.state;
    user.pincode = pincode || user.pincode;
    user.email = email || user.email;
    await user.save();
    res
      .status(200)
      .json({ message: "user profile retrive successfully", user });
  } catch (err) {
    console.log(err, "kjclvcs");
  }
});

// PROFILE GET

authRouter.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "user profile retrive successfully", user });
  } catch (err) {
    console.log(err, "kjclvcs");
  }
});
authRouter.patch(
  "/profile/:id",
  upload.single("profilePhoto"),
  async (req, res) => {
    const userId = req.params.id;
    try {
      const profilePhoto = req.file.path;
      const user = await User.findById(userId);
      if (!userId) {
        return res.status(404).json({ message: "User not found" });
      }
      user.profilePhoto = profilePhoto;
      await user.save();
      res
        .status(200)
        .json({ message: "user profile update successfully", user });
    } catch (err) {
      console.log(err, "kjclvcs");
    }
  }
);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rahulpa424@gmail.com",
    pass: "ptjs ldtu hqvw zaoh",
  },
});

// RESET PASSWORD
authRouter.post("/sendmail", async (req, res) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "email not found" });
    }
    const mailoption = {
      from: "rahulpa424@gmail.com",
      to: email,
      subject: "forgot password",
      text: `click on this link to reset password. http://localhost:3000/newpass/${email}`
    };
    await transporter.sendMail(mailoption);
    res.status(500).json({ message: "Email is send successfully" });
  } catch (err) {
    res.status(500).json({ message: "Email is not sent", err: err.message });
  }
});

// OVERIDE PASSWORD

authRouter.post("/resetpass/:email",async(req,res)=>{
  const email=req.params.email
  const {newPassword}= req.body
  try{
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"User not exist"})
    }
    const saltvalue=10
    const hashPassword=await bcrypt.hash(newPassword,saltvalue)
    user.password=hashPassword
    await user.save()
    res.status(200).json({message:"Password is reset sucessfully"})
  }catch(err){
    console.log(err,"Error dusring reset password")
  }
})

// CHANGE PASSWORD FROM PROFILE

authRouter.patch("/changepassword/:id",async(req,res)=>{
  try {
    const userId=req.params.id;
    const{password,newpassword}=req.body;
    const user=await User.findById(userId)
    if(!user){
      return res.status(400).json({message:"user not found"});
    }
    const saltvalue=10;
    const hashPassword=await bcrypt.hash(newpassword,saltvalue);
    const oldpassword=await bcrypt.compare(password,user.password);
    if(oldpassword){
      user.password=hashPassword;
    }
    await user.save()
    res.status(200).json({message:"change password successfully"})
  } catch (error) {
    console.log(error,"change passwword error!")
  }
});

export default authRouter;
