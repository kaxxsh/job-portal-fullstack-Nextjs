import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.CreateJWT = function () {
  return jwt.sign(
    { UserID: this._id, Username: this.Username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
