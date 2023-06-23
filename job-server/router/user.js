import Express from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleresetPassword,
  handlefind
} from "../controllers/UserController.js";

const User = Express.Router();

User.route("/register").post(handleRegisterUser);
User.route("/login").post(handleLoginUser);
User.route("/reset").post(handlefind).patch(handleresetPassword)

export default User;
