import User from "../models/user.schema";
import JWT from "jsonwebtoken";
import asyncHandler from "../services/asyncHandler";
import CustomError from "../utils/customError";
import config from "../config/index";
import User from "../models/user.schema";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new CustomError("Not authorized to access this route", 401);
  }
  try {
    const decodedJWTPayload = JWT.verify(token.config.JWT_SECRET);
    // _id, find user based on id and set thisin req.user
    req.user = User.findById(decodedJWTPayload._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not authorized to access this route", 401);
  }
});
