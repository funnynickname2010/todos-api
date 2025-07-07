// Importing express, incryption, jsonwebtoken and our database
import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

// Router
const routerAuth = express.Router();

// Routes
// Everything starts with /auth/

// Register a new user route 
routerAuth.post ("/register", (req, res) => {
    // Parsing(?) the request body into username and password
    const { username, password } = req.body;
    
    // Debug console log
    console.log(`New register, username: ${username}, password: ${password}`);
    

    // Inserting the new user data to the database

    try {
        //The incryption of the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);
        const result = insertUser.run(username, hashedPassword);

        // Creating a token (?)
        // result.lastInsertRowid fetches the automatically created id for the user
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: "10min"})

        // Returning the token (Why(?))
        res.json({ token });
    } catch (err) {
        console.log(err.message); // Debug stuff
        res.sendStatus(500); // Something broke down in the server
    }
})

// User login route
routerAuth.post ("/login", (req, res) => {
    const {username, password} = req.body;

    // Debug stuff, wip
    console.log(`New login, username: ${username}, password: ${password}`);

    try {
        // Fetching the user based on username (from the database)
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
        const user = getUser.get(username);

        // If user not found
        if (!user) {
            //Sending back the 404 status with the according message
            return res.status(404).send( { message: "User not found" } );
        }

        // Checking the password (the encrypted password is fetched from the database)
        const passwordIsValid = bcryptjs.compareSync(password, user.password);

        // Password is invalid
        if (!passwordIsValid) {
            return res.status(401).send( { message: "Password is invalid" } );
        }

        // Password is valid, creating a token for the future (?)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: "10min"});

        // Sending back the token
        res.json({ token });

    } catch (err) {
        console.log(err.message); // Debug needed stuff
        res.sendStatus(500); // Server broke down or whatever
    }
})

// Exporting the router
export default routerAuth;