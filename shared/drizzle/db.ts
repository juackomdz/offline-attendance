import { drizzle } from "drizzle-orm/libsql/web";

export const db = drizzle({
	connection: {
		url: process.env.TURSO_DB_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!
	}
});
