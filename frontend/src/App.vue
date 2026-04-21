<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PWAInstallPrompt from './components/PWAInstallPrompt.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
    <PWAInstallPrompt />
  </div>
</template>
