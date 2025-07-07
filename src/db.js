// Import better-sqlite3
import Database from "better-sqlite3";

// Debug print
//console.log("DB module loaded.");

// Open (or create) the SQLite database file
const db = new Database("database.db");

// Dropping the tables for debug
//db.exec(`DROP TABLE users;`);
//db.exec(`DROP TABLE todos;`);

// Create tables if they don’t exist
// Users
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );
`);

// Todos
db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        task TEXT NOT NULL,
        status BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`);

// Turning on foreign keys
db.exec("PRAGMA foreign_keys = ON");

// Export the database instance
export default db;
