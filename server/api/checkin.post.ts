import { schema } from "#shared/schema";
import { formatRut } from "rut-kit";
import { db } from "#shared/db";

export default eventHandler(async (event) => {
  const { data: body } = await readValidatedBody(event, schema.safeParse);

  try {
    const query = db.prepare(
      `INSERT INTO REGISTROS (rut, nombres, apellidos, tipo, marcacion) VALUES ($rut, $nombres, $apellidos, $tipo, $marcacion);`,
    );

    query.run({
      $rut: formatRut(body?.rut as string, "formatted"),
      $nombres: body?.nombre as string,
      $apellidos: body?.apellido as string,
      $tipo: "entrada",
      $marcacion: new Date().toISOString(),
    });

    return {
      mensaje: "ok",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});
