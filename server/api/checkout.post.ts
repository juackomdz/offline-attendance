import { type CheckinInput, type Asistencia, asistencias } from "#shared/types";

export default eventHandler(async (event) => {
  const body: CheckinInput = await readBody(event);

  const asistencia: Asistencia = {
    rut: body.rut,
    nombre: body.nombre,
    hora_salida: new Date(),
  };

  asistencias.push(asistencia);
  return {
    mensaje: "ok",
    data: asistencia,
  };
});
