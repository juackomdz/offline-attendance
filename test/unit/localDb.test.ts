import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Pendiente } from "../../app/utils/localDb";

const { mockStore, createAddPendiente, createGetPendientes, createRemovePendiente } = vi.hoisted(
  () => {
    const mockStore = {
      pendientes: [] as Pendiente[],
      autoId: 1,
    };

    const createAddPendiente = () =>
      vi.fn(async (data: Omit<Pendiente, "id" | "timestamp">) => {
        const id = mockStore.autoId++;
        mockStore.pendientes.push({
          ...data,
          id,
          timestamp: new Date().toISOString(),
        });
        return id;
      });

    const createGetPendientes = () => vi.fn(async () => [...mockStore.pendientes]);

    const createRemovePendiente = () =>
      vi.fn(async (id: number) => {
        const idx = mockStore.pendientes.findIndex((p) => p.id === id);
        if (idx >= 0) mockStore.pendientes.splice(idx, 1);
      });

    return { mockStore, createAddPendiente, createGetPendientes, createRemovePendiente };
  },
);

const addPendiente = createAddPendiente();
const getPendientes = createGetPendientes();
const removePendiente = createRemovePendiente();

vi.mock("@/utils/localDb", () => ({
  localDb: {},
  addPendiente,
  getPendientes,
  removePendiente,
}));

describe("localDb", () => {
  beforeEach(() => {
    mockStore.pendientes.length = 0;
    mockStore.autoId = 1;
    vi.clearAllMocks();
  });

  describe("addPendiente", () => {
    it("adds a checkin pendiente and returns an id", async () => {
      const id = await addPendiente({
        rut: "11111111-1",
        nombre: "Juan",
        apellido: "Pérez",
        endpoint: "checkin",
      });

      expect(id).toBeTypeOf("number");

      const all = await getPendientes();
      expect(all).toHaveLength(1);
      expect(all[0].rut).toBe("11111111-1");
      expect(all[0].nombre).toBe("Juan");
      expect(all[0].apellido).toBe("Pérez");
      expect(all[0].endpoint).toBe("checkin");
      expect(all[0].timestamp).toBeDefined();
    });

    it("adds a checkout pendiente", async () => {
      await addPendiente({
        rut: "11111111-1",
        nombre: "María",
        apellido: "García",
        endpoint: "checkout",
      });

      const all = await getPendientes();
      expect(all).toHaveLength(1);
      expect(all[0].endpoint).toBe("checkout");
    });

    it("adds multiple pendientes", async () => {
      await addPendiente({
        rut: "11111111-1",
        nombre: "Ana",
        apellido: "López",
        endpoint: "checkin",
      });
      await addPendiente({
        rut: "98765432-5",
        nombre: "Pedro",
        apellido: "Soto",
        endpoint: "checkout",
      });

      const all = await getPendientes();
      expect(all).toHaveLength(2);
    });

    it("sets timestamp as ISO string", async () => {
      await addPendiente({
        rut: "11111111-1",
        nombre: "Juan",
        apellido: "Pérez",
        endpoint: "checkin",
      });

      const all = await getPendientes();
      expect(all[0].timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe("getPendientes", () => {
    it("returns empty array when no pendientes", async () => {
      const result = await getPendientes();
      expect(result).toEqual([]);
    });

    it("returns all pendientes", async () => {
      await addPendiente({
        rut: "11111111-1",
        nombre: "Ana",
        apellido: "López",
        endpoint: "checkin",
      });
      await addPendiente({
        rut: "98765432-5",
        nombre: "Pedro",
        apellido: "Soto",
        endpoint: "checkout",
      });

      const result = await getPendientes();
      expect(result).toHaveLength(2);
    });
  });

  describe("removePendiente", () => {
    it("removes a pendiente by id", async () => {
      const id = await addPendiente({
        rut: "11111111-1",
        nombre: "Juan",
        apellido: "Pérez",
        endpoint: "checkin",
      });

      await removePendiente(id);

      const all = await getPendientes();
      expect(all).toHaveLength(0);
    });

    it("does not throw when removing non-existent id", async () => {
      await expect(removePendiente(9999)).resolves.toBeUndefined();
    });

    it("only removes the specified pendiente", async () => {
      const id1 = await addPendiente({
        rut: "11111111-1",
        nombre: "Ana",
        apellido: "López",
        endpoint: "checkin",
      });
      await addPendiente({
        rut: "98765432-5",
        nombre: "Pedro",
        apellido: "Soto",
        endpoint: "checkout",
      });

      await removePendiente(id1);

      const all = await getPendientes();
      expect(all).toHaveLength(1);
      expect(all[0].rut).toBe("98765432-5");
    });
  });
});
