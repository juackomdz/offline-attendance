import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const registrosTable = sqliteTable("registros", {
  id: int().primaryKey({ autoIncrement: true }),
  rut: text().notNull(),
  nombres: text(),
  apellidos: text(),
  tipo: text(),
  marcacion: text(),
});
