import { isOnline } from "@/composables/useOnline";
import { addPendiente, getPendientes, removePendiente } from "@/utils/localDb";

export const useSync = () => {
  const { online } = isOnline();
  const toast = useToast();
  const syncing = ref(false);

  const syncPendientes = async () => {
    if (syncing.value) return;
    syncing.value = true;

    try {
      const pendientes = await getPendientes();

      if (pendientes.length === 0) {
        syncing.value = false;
        return;
      }

      toast.add({
        summary: "Sincronizando",
        detail: `Enviando ${pendientes.length} registro(s) pendiente(s)...`,
        severity: "info",
        life: 3000,
      });

      for (const pendiente of pendientes) {
        try {
          await $fetch(`/api/${pendiente.endpoint}`, {
            method: "POST",
            body: {
              rut: pendiente.rut,
              nombre: pendiente.nombre,
              apellido: pendiente.apellido,
            },
          });

          await removePendiente(pendiente.id!);
        } catch {
          toast.add({
            summary: "Error de sincronización",
            detail: `No se pudo sincronizar el registro de ${pendiente.endpoint} para RUT ${pendiente.rut}`,
            severity: "error",
            life: 4000,
          });
        }
      }

      const remaining = await getPendientes();
      if (remaining.length === 0) {
        toast.add({
          summary: "Sincronización completada",
          detail: "Todos los registros pendientes fueron enviados",
          severity: "success",
          life: 3000,
        });
      }
    } finally {
      syncing.value = false;
    }
  };

  onMounted(() => {
    if (navigator.onLine) {
      syncPendientes();
    }
  });

  watch(online, (isOnline) => {
    if (isOnline) {
      syncPendientes();
    }
  });

  return { syncing, syncPendientes };
};
