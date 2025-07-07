// Imports
import express from "express";
import db from "../db.js";

// Router
const routerToDo = express.Router();

// Routes
// Everything starts with /todos/

// The list of todos the user gets
routerToDo.get("/", (req, res) => {

})

// Create a new todo
routerToDo.post("/", (req, res) => {

})

// Update the status of a todo
routerToDo.put("/:id", (req, res) => {

})

// Delete a todo
routerToDo.delete("/:id", (req, res) => {

})

// Export
export default routerToDo;