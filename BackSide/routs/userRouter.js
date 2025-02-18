import express from "express";
import {getCurrentUser, getAllUsers} from "../controllers/userController.js"
import {authenticateUser} from "../middileware/authMiddleware.js";
const router = express.Router();

router.get("/current-user",authenticateUser, getCurrentUser); 
router.get("/all-users",authenticateUser, getAllUsers); 



export default router;