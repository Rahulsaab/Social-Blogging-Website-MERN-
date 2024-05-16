import express from "express"
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import createRouter from "./routes/post.js"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser";
import {fileURLToPath} from "url"
import { dirname,join } from "path";
dotenv.config()
const app = express();
const port=process.env.PORT
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use ('/auth',authRouter)
app.use('/post',createRouter)

const __filename =fileURLToPath(import.meta.url)
const __dirname= dirname(__filename)
app.use("/upload",express.static(join(__dirname,"upload")))
// app.use("/profile", express.static(join(__dirname,"profile")));
const connection = process.env.CONNECTION_STRING
mongoose
  .connect(
    connection,
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => {
    console.log("Database is Connected");
  })
  .catch((error) => {
    console.log("Database is not connected", error);
  });

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
