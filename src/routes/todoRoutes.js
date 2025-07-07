// Imports
import express from "express";
import db from "../db.js";

// Router
const routerToDo = express.Router();

// Routes
// Everything starts with /todos/

// The list of todos the user gets
routerToDo.get("/", (req, res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`);
    const todos = getTodos.all(req.userId);
    res.json(todos);
})

// Create a new todo
routerToDo.post("/", (req, res) => {
    const {task} = req.body;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);
    const result = insertTodo.run(req.userId, task);
    res.json({ id: result.lastInsertRowid, task, status: 0 });
})

// Update the status of a todo
routerToDo.put("/:id", (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    const updatedTodo = db.prepare(`UPDATE todos SET status = ? WHERE id = ?`);
    updatedTodo.run(status, id);

    res.json({ message: "Todo completed!" });
})

// Delete a todo
routerToDo.delete("/:id", (req, res) => {
    const { id } = req.params;
    const deletedTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`);
    deletedTodo.run(id, req.userId);

    res.json({ message: "Todo deleted!" });
})

// Export
export default routerToDo;