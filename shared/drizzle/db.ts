import { drizzle } from "drizzle-orm/libsql/web";
import { createClient } from "@libsql/client/web"

const client = createClient({
	authToken: Bun.env.TURSO_AUTH_TOKEN!,
	url: Bun.env.TURSO_DB_URL!,
})

export const db = drizzle(client);
