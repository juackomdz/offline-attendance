import { Database } from "bun:sqlite";

export default eventHandler(async (event) => {
    const db = new Database(":memory:");
    const query = db.query("select 'Hola en sqlite' as message;");

    return query.get()

})