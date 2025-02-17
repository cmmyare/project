import User from "../model/users.js";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customError.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword, comparePasswords } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
export const register = async (req, res) => {
  const isFirstAcount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAcount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  // Find user by email
  const user = await User.findOne({ email: req.body.email });

  // Check if user exists and password is valid
  const isValidUser =
    user && (await comparePasswords(req.body.password, user.password));

  if (!isValidUser) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid credentials" });
  }

  // Generate JWT token
  const token = createJWT({ userId: user._id, role: user.role });

  // Set cookie with JWT
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  // Send success response
  res.status(StatusCodes.OK).json({ msg: "User logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
