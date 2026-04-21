<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

// 根据品牌返回随机渐变色
function getGradient(brand) {
  const gradients = {
    'Nike': 'from-green-100 to-lime-200',
    'Adidas': 'from-stone-100 to-amber-100',
    'New Balance': 'from-emerald-100 to-green-200',
    'Asics': 'from-yellow-100 to-lime-200',
    'Salomon': 'from-teal-100 to-emerald-200',
    'On': 'from-orange-100 to-stone-200'
  }
  return gradients[brand] || 'from-gray-100 to-gray-200'
}
</script>

<template>
  <RouterLink
    :to="`/product/${product.id}`"
    class="block overflow-hidden rounded-3xl bg-[#fffdf6] shadow-lg shadow-green-100 transition-transform hover:scale-[1.02]"
  >
    <!-- 商品图片 -->
    <div :class="`aspect-[4/3] bg-gradient-to-br ${getGradient(product.brand)}`">
      <img
        v-if="product.images && product.images[0]"
        :src="product.images[0]"
        :alt="product.name"
        class="h-full w-full object-cover"
      />
    </div>

    <!-- 商品信息 -->
    <div class="p-5">
      <div class="flex items-center justify-between">
        <div class="text-sm font-semibold text-stone-500">{{ product.brand }}</div>
        <div class="rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700">
          {{ product.status }}
        </div>
      </div>
      <div class="mt-1 text-xl font-black">{{ product.model }}</div>
      <div class="mt-3 flex justify-between text-sm text-stone-500">
        <span>尺码 {{ product.size }}</span>
        <span>{{ product.grade }}</span>
      </div>
      <div class="mt-4 text-2xl font-black text-green-700">¥{{ product.price }}</div>
    </div>
  </RouterLink>
</template>
