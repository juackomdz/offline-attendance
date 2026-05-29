import { schema } from "#shared/zod/schema";
import { registrosTable } from "#shared/drizzle/schema";
import { formatRut } from "rut-kit";
import { db } from "#shared/drizzle/db";

export default eventHandler(async (event) => {
  const { data: body } = await readValidatedBody(event, schema.safeParse);

  const checkin: typeof registrosTable.$inferInsert = {
    rut: formatRut(body?.rut as string, "formatted"),
    nombres: body?.nombre,
    apellidos: body?.apellido,
    tipo: "entarda",
    marcacion: new Date().toLocaleString(),
  };

  await db.insert(registrosTable).values(checkin);

  setResponseStatus(event, 201)
  return {
    mensaje: "ok",
  };
});
