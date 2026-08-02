import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import cors from "cors";
import router from "./routes/urlRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin:process.env.FRONTEND_URL,
}));


app.use(express.json()); //without this we get undefined after using req.body
app.use(express.urlencoded({extended:true}));// data comes like username=pushp&password=239h23orno  so it convert this into json
app.use("/url", router);    //always upar wali dono line k niche

const port = 5000;

app.get("/",(req,res)=>{
  res.send("hello");
})
connectdb();
app.listen(port , (req,res)=>{
    console.log("app is listening on port 5000");
})