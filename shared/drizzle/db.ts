import { drizzle } from "drizzle-orm/libsql/web";
//import { createClient } from "@libsql/client/web"

/*
const client = createClient({
	authToken: process.env.TURSO_AUTH_TOKEN!,
	url: process.env.TURSO_DB_URL!,
})
*/
export const db = drizzle({
	connection: {
		url: process.env.TURSO_DB_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!
	}
});
