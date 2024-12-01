import asyncHandler from "express-async-handler";

import Todo from "../models/todoModel.js";

const addTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const todo = await Todo.create({ userId: req.user._id, title, description });

  if (todo) {
    res.status(201).json({
      id: todo._id,
      title: todo.title,
      description: todo.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid todo data");
  }
});

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id });

  if (todos) {
    res.status(200).json(todos);
  } else {
    res.status(404);
    throw new Error("Todos not found");
  }
});

const editTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  if (todo.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("User not authorized to edit this todo");
  }

  todo.title = title || todo.title;
  todo.description = description || todo.description;
  todo.status = status || todo.status;

  const updatedTodo = await todo.save();

  res.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(404);
    throw new Error("Todo not found");
  }

  if (todo.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("User not authorized to delete this todo");
  }

  await todo.deleteOne();
  res.status(200).json({ message: "Todo deleted successfully" });
});

export { addTodo, getTodos, editTodo, deleteTodo };
