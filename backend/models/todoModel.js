import mongoose from "mongoose";
import User from "./userModel.js";

const todoSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "incomplete",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
