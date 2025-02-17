import express from "express";
import {
  getData,
  sendData,
  getSingleData,
  updateData,
  deleteData,
} from "../controllers/data.js";
import {
  validationData,
  valideUpdatingData,
} from "../middileware/validateDataInput.js";
const router = express.Router();

router.post("/reg", validationData, sendData);
router.get("/reg", getData);
router.get("/reg/:id", getSingleData);
router.put("/reg/:id", valideUpdatingData, updateData);
router.delete("/reg/:id", deleteData);
export default router;
