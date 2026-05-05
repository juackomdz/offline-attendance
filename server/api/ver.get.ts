import { db } from "#shared/db";
export default eventHandler(async () => {
  const result = db.query("select * from REGISTROS;").all();

  return result;
});
