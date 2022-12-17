import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

//middleware
const app = express();
app.use(express.json());
//url encoded to accept form data
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//morgon logger
app.use(morgan("tiny")); // prints information about api req and response in console
export default app;
