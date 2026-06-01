import { schema } from "#shared/zod/schema";
import { registrosTable } from "#shared/drizzle/schema";
import { formatRut } from "rut-kit";
import { db } from "#shared/drizzle/db";
import { randomUUID } from "node:crypto";

export default eventHandler(async (event) => {
  const { data: body } = await readValidatedBody(event, schema.safeParse);

  const checkin: typeof registrosTable.$inferInsert = {
    id: randomUUID(),
    rut: formatRut(body?.rut as string, "formatted"),
    nombres: body?.nombre,
    apellidos: body?.apellido,
    tipo: "entrada",
    marcacion: new Date().toLocaleString(),
  };

  await db.insert(registrosTable).values(checkin);

  return {
    mensaje: "ok",
  };
});
