<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Menu from "primevue/menu";

const menuItems = ref([
  {
    label: "Inicio",
    icon: "pi pi-home",
    command: () => {
      navigateTo("/");
    },
  },
  {
    label: "Pruebas",
    icon: "pi pi-cog",
    command: () => {
      navigateTo("/test");
    },
  },
]);

const navigationOpen = ref(false);

const toggleMobileMenu = () => {
  navigationOpen.value = !navigationOpen.value;
};
</script>

<template>
  <header class="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-800">Control Asistencia</h1>
        </div>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-6">
          <Button
            label="Inicio"
            text
            severity="secondary"
            @click="navigateTo('/')"
            class="hover:bg-gray-100"
          />
          <Button
            label="Pruebas"
            text
            severity="secondary"
            @click="navigateTo('/test')"
            class="hover:bg-gray-100"
          />
        </div>

        <!-- Menu Mobile - Hamburger -->
        <div class="md:hidden">
          <Button
            :icon="navigationOpen ? 'pi pi-times' : 'pi pi-bars'"
            text
            severity="secondary"
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-gray-900 min-w-[44px] min-h-[44px]"
            aria-label="Toggle navigation"
          />
        </div>
      </div>

      <!-- Mobile Menu Panel -->
      <transition name="slide-down">
        <div v-if="navigationOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <Button
              label="Inicio"
              text
              severity="secondary"
              @click="
                () => {
                  navigateTo('/');
                  navigationOpen = false;
                }
              "
              class="w-full text-left justify-start py-3 hover:bg-gray-100 min-h-[48px]"
            />
            <Button
              label="Pruebas"
              text
              severity="secondary"
              @click="
                () => {
                  navigateTo('/test');
                  navigationOpen = false;
                }
              "
              class="w-full text-left justify-start py-3 hover:bg-gray-100 min-h-[48px]"
            />
          </div>
        </div>
      </transition>
    </nav>

    <!-- Desktop Menu Overlay -->
    <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" class="mt-2" />
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

code:where(.vue) > .ml-4 {
  margin-left: 0 !important;
}
</style>
