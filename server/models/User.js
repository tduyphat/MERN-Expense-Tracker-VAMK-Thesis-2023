import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: ["First name required"] },
    lastName: { type: String, required: ["Last name required"] },
    email: { type: String, required: ["Email required"] },
    password: { type: String, required: ["Password required"] },
    categories: [{ label: String, icon: String }],
  },
  { timestamps: true }
);

export default new mongoose.model("User", userSchema);
