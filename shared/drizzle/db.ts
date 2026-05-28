//import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client"
//import { migrate } from "drizzle-orm/bun-sqlite/migrator";

//const sqlite = new Database(":memory:");
const client = createClient({
	authToken: Bun.env.TURSO_AUTH_TOKEN!,
	url: Bun.env.TURSO_DB_URL!,
})

export const db = drizzle({ client });
