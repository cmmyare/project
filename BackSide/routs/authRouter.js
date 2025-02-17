import express from "express";
import { register, login, logout } from "../controllers/authController.js";
const router = express.Router();
import {
  validationRegister,
  validateLogin,
} from "../middileware/validateDataInput.js";
router.post("/login", validateLogin, login),
  router.post("/register", validationRegister, register);
router.get("/logout", logout);

export default router;
