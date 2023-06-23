import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import { badRequest } from "../error/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    throw new badRequest("Invalid token")
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.UserID, Username: payload.Username };
    next();
  } catch (error) {
    throw new badRequest("Invalid token");
  }
};

export default auth;
