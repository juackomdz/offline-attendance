import { Database } from "bun:sqlite";

export const db = new Database("test2.db");

db.run(`CREATE TABLE IF NOT EXISTS REGISTROS 
    (id INTEGER PRIMARY KEY AUTOINCREMENT, 
    rut TEXT, 
    nombres TEXT, 
    apellidos TEXT,
    tipo TEXT,
    marcacion TEXT)`);
