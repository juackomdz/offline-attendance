import { z } from "zod";
import { rutSchema } from "rut-kit/zod";

export const schema = z.object({
  nombre: z
    .string()
    .min(1, "Debe ingresar su nombre completo")
    .regex(/([A-Za-z])\w+/, "Nombre no puede contener caracteres especiales."),
  rut: rutSchema,
});

export type InputValidate = z.output<typeof schema>;
