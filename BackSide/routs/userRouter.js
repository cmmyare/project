import express from "express";
import {getCurrentUser} from "../controllers/userController.js"
import {authenticateUser} from "../middileware/authMiddleware.js";
const router = express.Router();

router.get("/current-user",authenticateUser, getCurrentUser); 



export default router;