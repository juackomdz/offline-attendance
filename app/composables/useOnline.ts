import { ref, onMounted, onUnmounted } from "vue";

export const isOnline = () => {
  const online = ref<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);
  const status = () => {
    online.value = typeof navigator !== "undefined" ? navigator.onLine : true;
  };

  onMounted(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("online", status);
      window.addEventListener("offline", status);
    }
  });

  onUnmounted(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("online", status);
      window.removeEventListener("offline", status);
    }
  });
  return { online };
};
