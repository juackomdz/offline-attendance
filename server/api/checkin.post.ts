import { type Asistencia, type CheckinInput, asistencias } from "#shared/types";

export default eventHandler(async (event) => {
  const body: CheckinInput = await readBody(event);

  const asistencia: Asistencia = {
    rut: body.rut,
    nombre: body.nombre,
    hora_entrada: new Date(),
  };

  asistencias.push(asistencia);

  return {
    mensaje: "ok",
    data: asistencia,
    total: asistencias.length,
  };
});
