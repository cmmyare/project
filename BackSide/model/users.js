import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "Galkio",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
  },
  avatarPublicId: {
    type: String,
  },
  email: String,
  password: String,
});
userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};
export default mongoose.model("User", userSchema);
