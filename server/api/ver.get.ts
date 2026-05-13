import { db } from "#shared/db"

export default eventHandler(async () => {
  return db.query("select * from registros").all();
});
