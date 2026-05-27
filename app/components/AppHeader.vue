<template>
  <header class="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-800">Control Asistencia</h1>
        </div>
      </div>
    </nav>
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
