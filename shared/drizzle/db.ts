import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const sqlite = new Database(":memory:");

sqlite.run(`CREATE TABLE registros (
	id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	rut text NOT NULL,
	nombres text,
	apellidos text,
	tipo text,
	marcacion text`)

export const db = drizzle({ client: sqlite });

migrate(db, { migrationsFolder: "./drizzle" });
