import { asistencias } from "#shared/types";
import { db } from "#shared/db"
export default eventHandler(async () => {
  //return asistencias;
  const query = db.query("select * from TEST")
  const result = query.get()

  return result
});
