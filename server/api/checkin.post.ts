import { type Asistencia, asistencias } from "#shared/types";
import { schema } from "#shared/schema";
import { formatRut } from "rut-kit";

export default eventHandler(async (event) => {
  const { data: body } = await readValidatedBody(event, schema.safeParse);

  const asistencia: Asistencia = {
    rut: formatRut(body?.rut as string, "formatted"),
    nombre: body?.nombre,
    apellido: body?.apellido,
    hora_entrada: new Date(),
  } as Asistencia;

  asistencias.push(asistencia);

  return {
    mensaje: "ok",
    data: asistencia,
    total: asistencias.length,
  };
});
