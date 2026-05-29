import { db } from "#shared/drizzle/db"
import { registrosTable } from "#shared/drizzle/schema"

export default eventHandler(async () => {

    await db.delete(registrosTable);

    return {
        mensaje: "elementos eliminados"
    }
})