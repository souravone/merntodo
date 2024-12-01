import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import {
  addTodo,
  getTodos,
  editTodo,
  deleteTodo,
} from "../controller/todoController.js";

const router = express.Router();

router.route("/").get(protect, getTodos).post(protect, addTodo);
router.route("/:id").put(protect, editTodo).delete(protect, deleteTodo);

export default router;
