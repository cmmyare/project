import Data from "../model/data.js";
import { validationResult } from "express-validator";
// get all data
export const getData = async (req, res) => {
  console.log(req.user);
  const data = await Data.find();
  res.status(200).json(data);
};
// send data
export const sendData = async (req, res) => {
  await Data.create(req.body);
  res.status(200).json({ message: "Data sent successfully" });
};
// get single data
export const getSingleData = async (req, res) => {
  //const { id } = req.params;
  const data = await Data.findById(req.params.id);
  res.status(200).json(data);
};
// update data
export const updateData = async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return updated document
    });

    if (!updatedData) {
      return res.status(404).json({ message: "Data not found" });
    }

    res
      .status(200)
      .json({ message: "Data updated successfully", data: updatedData });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete data
export const deleteData = async (req, res) => {
  const data = await Data.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Data deleted successfully" });
};
