import { StatusCodes } from "http-status-codes";
import User from "../model/users.js";


export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
  };
export const getAllUsers = async (req, res) => {
    const user = await User.find();
    // const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json(user);
  };





