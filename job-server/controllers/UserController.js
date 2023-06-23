import User from "../model/UserSchema.js";
import { badRequest, SuccessRequest } from "../error/index.js";
import bcrypt from "bcrypt";

const handleRegisterUser = async (req, res, next) => {
  const { Username, email, password, dob } = req.body;

  try {
    if (!Username || !email || !password || !dob) {
      throw new badRequest("Please enter all the fields");
    }
    const userData = await User.create({
      ...req.body,
    });
    const token = await userData.CreateJWT();
    res.json({ token: token });
    throw new SuccessRequest("User Registered");
  } catch (error) {
    next(error);
  }
};

const handleLoginUser = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new badRequest("Please enter all the fields");
    }
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      throw new badRequest("User not found");
    }
    const isMatch = await userData.comparePassword(req.body.password);
    if (!isMatch) {
      throw new badRequest("Invalid credentials");
    }
    const token = await userData.CreateJWT();
    res.json(token);
    throw new SuccessRequest("Login Successfull");
  } catch (error) {
    next(error);
  }
};

const handlefind = async (req, res, next) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) {
      throw new badRequest("User not found");
    }
    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const handleresetPassword = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { email: req.body.email },
      { password: await bcrypt.hash(req.body.password, 10) }
    );
    throw new SuccessRequest("Password Updated");
  } catch (error) {
    next(error);
  }
};

export { handleRegisterUser, handleLoginUser, handlefind, handleresetPassword };
