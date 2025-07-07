// The newer syntax for importing express and router
// The router is from the express library
//console.log("Top of server.js");

import express from "express";
//console.log("Express loaded");

import routerAuth from "./routes/authRoutes.js";
//console.log("Auth routes loaded");

import routerToDo from "./routes/todoRoutes.js";
//console.log("Todo routes loaded");
import dotenv from "dotenv";
import authMiddleware from "./middleware/authMiddleware.js";
//dotenv.config();
/*
process.on('uncaughtException', (err) => {
  console.error("Uncaught Exception:", err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
*/
// Creating the server via express package
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes, authentication
app.get("/", (req, res) => {
  res.send("Server is alive.");
});

app.use("/auth", authMiddleware, routerAuth);

// Routes, todos
app.use("/todos", authMiddleware, routerToDo);

// Listening to the port
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}.`);
})