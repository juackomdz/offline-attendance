import { z } from "zod";
import { rutSchema } from "rut-kit/zod";

export const schema = z.object({
  nombre: z
    .string()
    .min(1, "Debe ingresar su nombre")
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/, "Nombre no puede contener numeros."),
  rut: rutSchema,
  apellido: z
    .string()
    .min(1, "Debe ingresar sus apellidos")
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/, "Nombre no puede contener numeros."),
});

export type InputValidate = z.output<typeof schema>;
