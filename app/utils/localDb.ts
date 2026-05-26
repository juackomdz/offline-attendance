import Dexie, { type Table } from "dexie";

export interface Pendiente {
  id?: number;
  rut: string;
  nombre: string;
  apellido: string;
  endpoint: "checkin" | "checkout";
  timestamp: string;
}

class LocalDb extends Dexie {
  pendientes!: Table<Pendiente, number>;

  constructor() {
    super("controlAsistencia");
    this.version(1).stores({
      pendientes: "++id, rut, endpoint, timestamp",
    });
  }
}

export const localDb = new LocalDb();

export async function addPendiente(data: Omit<Pendiente, "id" | "timestamp">): Promise<number> {
  const id = await localDb.pendientes.add({
    ...data,
    timestamp: new Date().toISOString(),
  });
  return id as number;
}

export async function getPendientes(): Promise<Pendiente[]> {
  return localDb.pendientes.toArray();
}

export async function removePendiente(id: number): Promise<void> {
  await localDb.pendientes.delete(id);
}
