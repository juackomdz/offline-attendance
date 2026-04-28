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
    apellido: "",
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
              apellido: value.apellido,
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
              apellido: value.apellido,
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
  <div class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center justify-center">
    <Card class="w-full max-w-md lg:w-[28rem] lg:max-w-none">
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
                placeholder="Nombres"
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
            <form.Field name="apellido" v-slot="{ field }">
              <InputText
                :name="field.name"
                :value="field.state.value"
                placeholder="Apellidos"
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
          <Toast 
            position="top-center" 
            :pt="{
              root: { class: 'w-[95vw] sm:w-[25rem]' }
            }"
          />
          <div id="buttons" class="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center">
            <Button
              type="button"
              label="Registrar Entrada"
              @click="form.handleSubmit({ endpoint: 'checkin' })"
              class="min-h-[44px]"
            />
            <Button
              type="button"
              label="Registrar Salida"
              severity="danger"
              @click="form.handleSubmit({ endpoint: 'checkout' })"
              class="min-h-[44px]"
            />
          </div>
        </form>
      </template>
    </Card>
    <img
      src="/illustration-attendance.svg"
      alt="Ilustración de asistencia"
      class="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain"
    />
  </div>
</template>
