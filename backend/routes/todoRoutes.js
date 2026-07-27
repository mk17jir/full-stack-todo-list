import express from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  togglePinTodo,
  toggleComplete
} from "../controllers/todoController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


router.get(
  "/",
  protect,
  getTodos
);


router.get(
  "/:id",
  protect,
  getTodoById
);


router.post(
  "/",
  protect,
  createTodo
);


router.put(
  "/:id",
  protect,
  updateTodo
);


router.delete(
  "/:id",
  protect,
  deleteTodo
);


router.put(
  "/:id/pin",
  protect,
  togglePinTodo
);


router.put(
  "/:id/complete",
  protect,
  toggleComplete
);



export default router;