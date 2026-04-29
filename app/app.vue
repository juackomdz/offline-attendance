<script setup>
import "~/assets/css/responsive.css";
</script>

<template>
  <div>
    <NuxtPwaManifest />
    <AppHeader />
    <main class="pt-16">
      <NuxtPage />
    </main>
  </div>
</template>
