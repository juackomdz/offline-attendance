import { type Asistencia, asistencias } from "#shared/types";
import { schema } from "#shared/schema";
import { formatRut } from "rut-kit";

export default eventHandler(async (event) => {
  const { data: body } = await readValidatedBody(event, schema.safeParse);

  /*
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error en body',
      data: result.error
    })
  }
  */
  const format = formatRut(body?.rut as string, 'formatted')
  const asistencia: Asistencia = {
    rut: format,
    nombre: body?.nombre,
    apellido: body?.apellido,
    hora_salida: new Date(),
  } as Asistencia;

  asistencias.push(asistencia);
  return {
    mensaje: "ok",
    data: asistencia,
  };
});
