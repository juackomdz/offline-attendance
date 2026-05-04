import { Database } from "bun:sqlite";

export const db = new Database(":memory:");

db.run("CREATE TABLE TEST (id INTEGER PRIMARY KEY, valor TEXT)")