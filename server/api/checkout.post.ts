import { schema } from "#shared/zod/schema";
import { formatRut } from "rut-kit";
import { db } from "#shared/drizzle/db";
import { registrosTable } from "#shared/drizzle/schema";

export default eventHandler(async (event) => {
  const { data: body } = await readValidatedBody(event, schema.safeParse);

  const checkout: typeof registrosTable.$inferInsert = {
    rut: formatRut(body?.rut as string, "formatted"),
    nombres: body?.nombre,
    apellidos: body?.apellido,
    tipo: "salida",
    marcacion: new Date().toLocaleString(),
  };

  await db.insert(registrosTable).values(checkout);

  return {
    mensaje: "ok",
  };
});
