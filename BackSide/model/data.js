import mongoose, { mongo } from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    phone: Number,
    email: String,
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Data", dataSchema);
