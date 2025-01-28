import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import userRouter from "./routes/userRoute.js";
import companyRouter from "./routes/companyRoute.js";
import jobRouter from "./routes/jobRoute.js";
import applicationRouter from "./routes/applicationRoute.js";


dotenv.config({});

const app = express();


const _dirname = path.resolve()


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOption = {
  origin: "https://jobportal-yikl.onrender.com/",
  credentials: true,
};
app.use(cors(corsOption));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(_dirname, "uploads")));


const PORT = process.env.PORT || 6000;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});