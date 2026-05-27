import { db } from "#shared/drizzle/db";
import { registrosTable } from "#shared/drizzle/schema";

export default eventHandler(async () => {
  //const result = db.query("select * from REGISTROS;").all();
  const result = await db.select().from(registrosTable);
  return result;
});
