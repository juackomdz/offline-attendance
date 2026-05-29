import { describe, it, expect } from "vitest";
import { schema } from "../../shared/zod/schema";

describe("schema", () => {
  const validInput = {
    rut: "11111111-1",
    nombre: "Juan",
    apellido: "Pérez",
  };

  describe("valid input", () => {
    it("accepts valid input with formatted RUT", () => {
      const result = schema.safeParse({
        ...validInput,
        rut: "11.111.111-1",
      });
      expect(result.success).toBe(true);
    });

    it("accepts valid input with unformatted RUT", () => {
      const result = schema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("accepts names with accented characters", () => {
      const result = schema.safeParse({
        rut: "11111111-1",
        nombre: "María José",
        apellido: "García López",
      });
      expect(result.success).toBe(true);
    });

    it("accepts names with ñ", () => {
      const result = schema.safeParse({
        rut: "11111111-1",
        nombre: "Iñaki",
        apellido: "Muñoz",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("nombre validation", () => {
    it("rejects empty nombre", () => {
      const result = schema.safeParse({ ...validInput, nombre: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const nombreError = result.error.issues.find((i) => i.path[0] === "nombre");
        expect(nombreError?.message).toBe("Debe ingresar su nombre");
      }
    });

    it("rejects nombre with numbers", () => {
      const result = schema.safeParse({ ...validInput, nombre: "Juan123" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const nombreError = result.error.issues.find((i) => i.path[0] === "nombre");
        expect(nombreError?.message).toBe("Nombre no puede contener numeros.");
      }
    });

    it("rejects nombre with special characters", () => {
      const result = schema.safeParse({ ...validInput, nombre: "Juan@" });
      expect(result.success).toBe(false);
    });

    it("accepts nombre with spaces", () => {
      const result = schema.safeParse({
        ...validInput,
        nombre: "Juan Carlos",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("apellido validation", () => {
    it("rejects empty apellido", () => {
      const result = schema.safeParse({ ...validInput, apellido: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const apellidoError = result.error.issues.find((i) => i.path[0] === "apellido");
        expect(apellidoError?.message).toBe("Debe ingresar sus apellidos");
      }
    });

    it("rejects apellido with numbers", () => {
      const result = schema.safeParse({ ...validInput, apellido: "Pérez99" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const apellidoError = result.error.issues.find((i) => i.path[0] === "apellido");
        expect(apellidoError?.message).toBe("Nombre no puede contener numeros.");
      }
    });
  });

  describe("rut validation", () => {
    it("rejects empty rut", () => {
      const result = schema.safeParse({ ...validInput, rut: "" });
      expect(result.success).toBe(false);
    });

    it("rejects rut with invalid checksum", () => {
      const result = schema.safeParse({ ...validInput, rut: "76189746-K" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const rutError = result.error.issues.find((i) => i.path[0] === "rut");
        expect(rutError?.message).toContain("Dígito verificador");
      }
    });

    it("rejects rut with wrong format", () => {
      const result = schema.safeParse({ ...validInput, rut: "abc" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const rutError = result.error.issues.find((i) => i.path[0] === "rut");
        expect(rutError?.message).toContain("Formato de RUT");
      }
    });
  });

  describe("missing fields", () => {
    it("rejects input missing nombre", () => {
      const { ...withoutNombre } = validInput;
      const result = schema.safeParse(withoutNombre);
      expect(result.success).toBe(false);
    });

    it("rejects input missing rut", () => {
      const { ...withoutRut } = validInput;
      const result = schema.safeParse(withoutRut);
      expect(result.success).toBe(false);
    });

    it("rejects input missing apellido", () => {
      const { ...withoutApellido } = validInput;
      const result = schema.safeParse(withoutApellido);
      expect(result.success).toBe(false);
    });
  });
});
