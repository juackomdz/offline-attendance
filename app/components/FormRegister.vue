<script setup lang="ts">
import { useForm } from "@tanstack/vue-form";

import { schema } from "#shared/zod/schema";
import { isOnline } from "@/composables/useOnline";
import { addPendiente } from "@/utils/localDb";

const { online } = isOnline();

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Card from "primevue/card";
import Toast from "primevue/toast";

type SubmitMeta = {
  endpoint: "checkin" | "checkout";
};

const toast = useToast();

const submitRegistro = async (
  endpoint: "checkin" | "checkout",
  value: { rut: string; nombre: string; apellido: string },
) => {
  const body = {
    nombre: value.nombre,
    rut: value.rut,
    apellido: value.apellido,
  };

  if (online.value) {
    await $fetch(`/api/${endpoint}`, {
      method: "POST",
      body,
    });
    toast.add({
      summary: "Registro Exitoso",
      life: 3000,
      detail:
        endpoint === "checkin"
          ? "Ingreso registrado exitosamente"
          : "Salida registrada exitosamente",
      severity: "success",
    });
  } else {
    await addPendiente({
      rut: value.rut,
      nombre: value.nombre,
      apellido: value.apellido,
      endpoint,
    });
    toast.add({
      summary: "Registro Local",
      life: 4000,
      detail:
        endpoint === "checkin"
          ? "Ingreso guardado localmente. Se sincronizará al recuperar conexión."
          : "Salida guardada localmente. Se sincronizará al recuperar conexión.",
      severity: "warn",
    });
  }
};

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
    try {
      await submitRegistro(meta.endpoint, value);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  },
});

watch(online, () => {
  if (online.value === false) {
    toast.add({
      life: 2000,
      summary: "Info",
      severity: "contrast",
      detail: "Almacenando localmente.",
    });
  }
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
              root: { class: 'w-[95vw] sm:w-[25rem]' },
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
