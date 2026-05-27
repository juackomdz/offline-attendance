import { describe, it, expect, beforeEach } from "vitest";
// @ts-ignore
import { Database } from "bun:sqlite";
import { schema } from "../../shared/schema";
import { formatRut } from "rut-kit";

function insertRegistro(
  db: Database,
  body: { rut: string; nombre: string; apellido: string },
  tipo: "entrada" | "salida",
) {
  const parsed = schema.safeParse(body);
  if (!parsed.success) throw new Error("Validation failed");

  const query = db.prepare(
    `INSERT INTO REGISTROS (rut, nombres, apellidos, tipo, marcacion) VALUES ($rut, $nombres, $apellidos, $tipo, $marcacion);`,
  );

  query.run({
    $rut: formatRut(parsed.data.rut, "formatted"),
    $nombres: parsed.data.nombre,
    $apellidos: parsed.data.apellido,
    $tipo: tipo,
    $marcacion: new Date().toISOString(),
  });
}

describe("API route logic", () => {
  let db: Database;

  beforeEach(() => {
    db = new Database(":memory:");
    db.run(`CREATE TABLE IF NOT EXISTS REGISTROS
      (id INTEGER PRIMARY KEY AUTOINCREMENT, rut TEXT, nombres TEXT, apellidos TEXT, tipo TEXT, marcacion TEXT)`);
  });

  describe("checkin logic", () => {
    it("inserts an entrada record with formatted RUT", () => {
      insertRegistro(
        db,
        {
          rut: "11111111-1",
          nombre: "Juan",
          apellido: "Pérez",
        },
        "entrada",
      );

      const rows = db.query("SELECT * FROM REGISTROS").all() as Array<Record<string, unknown>>;
      expect(rows).toHaveLength(1);
      expect(rows[0].rut).toBe("11.111.111-1");
      expect(rows[0].nombres).toBe("Juan");
      expect(rows[0].apellidos).toBe("Pérez");
      expect(rows[0].tipo).toBe("entrada");
    });

    it("sets marcacion as ISO date string", () => {
      insertRegistro(
        db,
        {
          rut: "11111111-1",
          nombre: "Juan",
          apellido: "Pérez",
        },
        "entrada",
      );

      const rows = db.query("SELECT * FROM REGISTROS").all() as Array<Record<string, unknown>>;
      expect(rows[0].marcacion).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    it("throws on invalid body", () => {
      expect(() => insertRegistro(db, { rut: "", nombre: "", apellido: "" }, "entrada")).toThrow(
        "Validation failed",
      );
    });

    it("throws on missing fields", () => {
      expect(() =>
        insertRegistro(db, { rut: "11111111-1", nombre: "Juan", apellido: "" }, "entrada"),
      ).toThrow("Validation failed");
    });

    it("throws on invalid RUT", () => {
      expect(() =>
        insertRegistro(db, { rut: "abc", nombre: "Juan", apellido: "Pérez" }, "entrada"),
      ).toThrow("Validation failed");
    });
  });

  describe("checkout logic", () => {
    it("inserts a salida record with formatted RUT", () => {
      insertRegistro(
        db,
        {
          rut: "11111111-1",
          nombre: "Juan",
          apellido: "Pérez",
        },
        "salida",
      );

      const rows = db.query("SELECT * FROM REGISTROS").all() as Array<Record<string, unknown>>;
      expect(rows).toHaveLength(1);
      expect(rows[0].tipo).toBe("salida");
    });

    it("throws on invalid body", () => {
      expect(() =>
        insertRegistro(db, { rut: "abc", nombre: "123", apellido: "!" }, "salida"),
      ).toThrow("Validation failed");
    });
  });

  describe("ver logic", () => {
    it("returns empty array when no registros", () => {
      const rows = db.query("SELECT * FROM REGISTROS").all();
      expect(rows).toEqual([]);
    });

    it("returns all registros in insertion order", () => {
      insertRegistro(
        db,
        {
          rut: "11111111-1",
          nombre: "Ana",
          apellido: "López",
        },
        "entrada",
      );
      insertRegistro(
        db,
        {
          rut: "98765432-5",
          nombre: "Pedro",
          apellido: "Soto",
        },
        "salida",
      );

      const rows = db.query("SELECT * FROM REGISTROS").all() as Array<Record<string, unknown>>;
      expect(rows).toHaveLength(2);
      expect(rows[0].tipo).toBe("entrada");
      expect(rows[1].tipo).toBe("salida");
    });

    it("returns multiple entradas and salidas", () => {
      insertRegistro(db, { rut: "11111111-1", nombre: "Ana", apellido: "López" }, "entrada");
      insertRegistro(db, { rut: "11111111-1", nombre: "Ana", apellido: "López" }, "salida");
      insertRegistro(db, { rut: "98765432-5", nombre: "Pedro", apellido: "Soto" }, "entrada");

      const rows = db.query("SELECT * FROM REGISTROS").all() as Array<Record<string, unknown>>;
      expect(rows).toHaveLength(3);
    });
  });

  describe("RUT formatting", () => {
    it("formats RUT with dots and dash via rut-kit", () => {
      insertRegistro(db, { rut: "11111111-1", nombre: "Juan", apellido: "Pérez" }, "entrada");

      const rows = db.query("SELECT * FROM REGISTROS").all() as Array<Record<string, unknown>>;
      expect(rows[0].rut).toBe("11.111.111-1");
    });

    it("handles formatted RUT input correctly", () => {
      insertRegistro(db, { rut: "98.765.432-5", nombre: "Ana", apellido: "López" }, "entrada");

      const rows = db.query("SELECT * FROM REGISTROS").all() as Array<Record<string, unknown>>;
      expect(rows[0].rut).toBe("98.765.432-5");
    });
  });
});
