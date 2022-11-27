import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [50, "Name must be less than 50 character"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be atlease 8 character"],
      select: false, // whenever we make database query this filed will not come in database
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles), // we will get array of values
      default: AuthRoles.USER,
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
