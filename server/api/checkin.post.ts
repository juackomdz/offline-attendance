//import { type Asistencia, /*asistencias*/ } from "#shared/types";
import { schema } from "#shared/schema";
//import { formatRut } from "rut-kit";
import { db } from "#shared/db"

export default eventHandler(async (event) => {
  const { data: body } = await readValidatedBody(event, schema.safeParse);

  /*
  const asistencia: Asistencia = {
    rut: formatRut(body?.rut as string, "formatted"),
    nombre: body?.nombre,
    apellido: body?.apellido,
    hora_entrada: new Date(),
  } as Asistencia;
*/
  //asistencias.push(asistencia);
  const query = db.query("INSERT INTO TEST VALUES (1,'prueba')")

  const result = query.get()

  return {
    mensaje: "ok",
    //data: asistencia,
    //total: asistencias.length,
    result
  };
});
