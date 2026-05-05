import { Database } from "bun:sqlite";

export const db = new Database(":memory:");

db.run(`CREATE TABLE IF NOT EXISTS REGISTROS 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    rut TEXT, 
    nombres TEXT, 
    apellidos TEXT,
    tipo TEXT,
    marcacion TEXT)`)