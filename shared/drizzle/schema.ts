import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const registrosTable = sqliteTable("registros", {
  id: text().primaryKey().notNull(),
  rut: text().notNull(),
  nombres: text(),
  apellidos: text(),
  tipo: text(),
  marcacion: text(),
});
