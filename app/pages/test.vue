<template>
  <div class="min-h-[calc(100vh-4rem)] bg-zinc-200 p-6 flex flex-col items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Página de Pruebas</h1>
      <kbd class="block text-center mb-6 px-4 py-2 bg-gray-100 rounded-lg">
        <span class="text-sm text-gray-600">Presiona el botón para probar las notificaciones</span>
      </kbd>
      <Button
        label="Probar Notificación"
        @click="test"
        class="w-full min-h-[44px] hover:scale-105 transition-transform relative z-10"
      />
      <Toast
        position="bottom-center"
        :pt="{
          root: { class: 'w-[95vw] sm:w-[25rem]' },
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from "primevue";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";
import { isOnline } from "@/composables/useOnline";
import { watch } from "vue";

const toast = useToast();

const { online } = isOnline();
watch(online, () => {
  toast.add({
    detail: online.value == true ? "Sincronizando." : "Almacenando localmente.",
    life: 2000,
    summary: "Info",
    severity: "warn",
  });
});

const test = () => {
  toast.add({
    detail: "test toast",
    life: 3000,
    severity: "info",
    summary: "Test",
  });
};
</script>
