import { db } from "#shared/drizzle/db";
import { registrosTable } from "#shared/drizzle/schema";

export default eventHandler(async (event) => {
  const authHeader = event.node.req.headers["authorization"];
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    throw createError({
      statusCode: 403,
      message: "Recurso no permitido",
    });
  }

  await db.delete(registrosTable);

  return {
    mensaje: "elementos eliminados",
  };
});
