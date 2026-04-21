<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-green-100 bg-[#fffdf6]/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3">
        <img src="/favicon.svg" alt="鉴真仓" class="h-16 w-auto" />
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden gap-8 text-sm font-medium text-stone-600 md:flex">
        <RouterLink to="/" class="hover:text-green-700">首页</RouterLink>
        <RouterLink to="/contact" class="hover:text-green-700">联系我们</RouterLink>
        <RouterLink to="/admin" class="text-green-600 hover:text-green-700">管理后台</RouterLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden p-2">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>
</template>
