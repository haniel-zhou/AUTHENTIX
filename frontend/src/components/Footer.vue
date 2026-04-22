<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="border-t border-green-100 bg-[#fffdf6] px-5 py-8">
    <div class="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-stone-500">
      <a href="#" class="hover:text-green-700">关于我们</a>
      <a href="#" class="hover:text-green-700">用户协议</a>
      <a href="#" class="hover:text-green-700">隐私政策</a>
      <RouterLink to="/contact" class="hover:text-green-700">联系我们</RouterLink>
    </div>
    <div class="mx-auto mt-6 max-w-6xl text-center text-xs text-stone-400">
      © 2026 鉴真仓 · 二手正品鞋 · 鉴真入仓，只卖真鞋
    </div>
  </footer>
</template>
