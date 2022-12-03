import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";
import crypto from "crypto";

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
//Challane 1 : Encrypt the passowrd
//use funciton not arrow function because this not work
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//add more feature directly to schema
userSchema.methods = {
  //compare password
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },

  //generate JWT TOKEN
  getJWTToken: function () {
    return JWT.sign(
      {
        _id: this._id,
        role: this.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );
  },

  //Generating token and time and sending to user and database
  generateForgetPasswordToken: function () {
    const forgotToken = crypto.randomBytes(20).toString("hex");

    //step 1: save to DB
    //updating forgetPassword Token in database
    this.forgetPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");
    //updating forgetPasswordExpiry Token in database
    this.forgetPasswordExpiry = Date.now() + 20 * 60 * 1000;
    //return values to user
    return forgotToken;
  },
};

export default mongoose.model("User", userSchema);
