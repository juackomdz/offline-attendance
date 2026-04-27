<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";

import { schema } from "#shared/schema";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from "primevue/card";
import Toast from "primevue/toast";

type SubmitMeta = {
  endpoint: "checkin" | "checkout";
};

const toast = useToast();
const form = useForm({
  defaultValues: {
    rut: "",
    nombre: "",
  },
  validators: {
    onChange: schema,
  },
  onSubmitMeta: { endpoint: "checkin" } as SubmitMeta,
  onSubmit: async ({ value, meta }) => {
    switch (meta.endpoint) {
      case "checkin":
        try {
          await $fetch("/api/checkin", {
            method: "POST",
            body: {
              nombre: value.nombre,
              rut: value.rut,
            },
          });
          toast.add({
            summary: "Registro Exitoso",
            life: 3000,
            detail: "Ingreso registrado exitosamente",
            severity: "success",
          });
          form.reset();
        } catch (err: any) {
          console.log("Error al registrar asistencia");
        }
        break;
      case "checkout":
        try {
          await $fetch("/api/checkout", {
            method: "POST",
            body: {
              nombre: value.nombre,
              rut: value.rut,
            },
          });
          toast.add({
            summary: "Registro Exitoso",
            life: 3000,
            detail: "Salida registrada exitosamente",
            severity: "success",
          });
          form.reset();
        } catch (error) {
          console.log(error);
        }
        break;
    }
  },
});
</script>

<template>
  <div class="flex gap-12 items-center">
    <Card style="width: 28rem; overflow: hidden">
      <template #title> Registro de Asistencias </template>
      <template #content>
        <form>
          <div class="mt-3 mb-5">
            <form.Field name="rut" v-slot="{ field }">
              <InputText
                :name="field.name"
                :value="field.state.value"
                placeholder="RUT"
                @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                fluid
              />
              <Message
                variant="simple"
                severity="error"
                size="small"
                v-if="!field.state.meta.isValid"
                >{{ field.state.meta.errors[0]?.message }}</Message
              >
            </form.Field>
          </div>
          <div class="mb-5">
            <form.Field name="nombre" v-slot="{ field }">
              <InputText
                :name="field.name"
                :value="field.state.value"
                placeholder="Nombre"
                @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
                fluid
              />
              <Message
                variant="simple"
                severity="error"
                size="small"
                v-if="!field.state.meta.isValid"
                >{{ field.state.meta.errors[0]?.message }}</Message
              >
            </form.Field>
          </div>
          <Toast position="top-center" />
          <div id="buttons" class="items-center flex gap-8 ml-9">
            <Button
              type="button"
              label="Registrar Entrada"
              @click="form.handleSubmit({ endpoint: 'checkin' })"
            />
            <Button
              type="button"
              label="Registrar Salida"
              severity="danger"
              @click="form.handleSubmit({ endpoint: 'checkout' })"
            />
          </div>
        </form>
      </template>
    </Card>
    <img
      src="/illustration-attendance.svg"
      alt="Ilustración de asistencia"
      class="w-80 h-80 object-contain"
    />
  </div>
</template>
