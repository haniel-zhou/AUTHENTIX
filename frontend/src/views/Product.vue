<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { getProduct } from '../api/products'

const route = useRoute()
const product = ref(null)
const loading = ref(true)

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

onMounted(async () => {
  try {
    product.value = await getProduct(route.params.id)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-8">
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="grid gap-8 md:grid-cols-2">
        <div class="aspect-square rounded-3xl bg-gray-200"></div>
        <div>
          <div class="h-6 w-20 rounded bg-gray-200"></div>
          <div class="mt-4 h-10 w-64 rounded bg-gray-200"></div>
          <div class="mt-4 h-8 w-32 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>

    <!-- Product Detail -->
    <div v-else-if="product" class="grid gap-8 md:grid-cols-2">
      <!-- 返回链接 -->
      <RouterLink to="/" class="mb-4 flex items-center gap-2 text-sm text-stone-500 hover:text-green-700 md:col-span-2">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        返回首页
      </RouterLink>

      <!-- 商品图片 -->
      <div :class="`aspect-square rounded-3xl bg-gradient-to-br ${getGradient(product.brand)} overflow-hidden`">
        <img
          v-if="product.images && product.images[0]"
          :src="product.images[0]"
          :alt="product.name"
          class="h-full w-full object-cover"
        />
      </div>

      <!-- 商品信息 -->
      <div>
        <!-- 品牌 & 状态 -->
        <div class="flex items-center gap-3">
          <span class="text-sm font-semibold text-stone-500">{{ product.brand }}</span>
          <span class="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
            {{ product.status }}
          </span>
        </div>

        <!-- 商品名称 -->
        <h1 class="mt-3 text-3xl font-black md:text-4xl">{{ product.name }}</h1>

        <!-- 价格 -->
        <div class="mt-4 text-4xl font-black text-green-700">¥{{ product.price }}</div>

        <!-- 验真编号 -->
        <div class="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          验真编号：{{ product.verifyCode }}
        </div>

        <!-- 规格信息 -->
        <div class="mt-6 grid grid-cols-3 gap-4">
          <div class="rounded-xl bg-stone-100 p-4 text-center">
            <div class="text-sm text-stone-500">尺码</div>
            <div class="mt-1 font-bold">{{ product.size }}</div>
          </div>
          <div class="rounded-xl bg-stone-100 p-4 text-center">
            <div class="text-sm text-stone-500">成色</div>
            <div class="mt-1 font-bold text-green-700">{{ product.grade }}</div>
          </div>
          <div class="rounded-xl bg-stone-100 p-4 text-center">
            <div class="text-sm text-stone-500">状态</div>
            <div class="mt-1 font-bold">{{ product.isCleaned ? '已清洗' : '待清洗' }}</div>
          </div>
        </div>

        <!-- 商品描述 -->
        <div class="mt-6">
          <h3 class="font-bold">商品描述</h3>
          <p class="mt-2 text-stone-600">{{ product.description }}</p>
        </div>

        <!-- 瑕疵说明 -->
        <div v-if="product.defects && product.defects.length > 0" class="mt-4">
          <h3 class="font-bold text-amber-700">瑕疵说明</h3>
          <ul class="mt-2 list-inside list-disc text-stone-600">
            <li v-for="defect in product.defects" :key="defect">{{ defect }}</li>
          </ul>
        </div>

        <!-- 联系购买 -->
        <div class="mt-8">
          <RouterLink
            to="/contact"
            class="block w-full rounded-2xl bg-green-700 px-6 py-4 text-center font-bold text-white shadow-lg shadow-green-200 transition-transform hover:scale-[1.02]"
          >
            联系客服购买
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Product Not Found -->
    <div v-else class="py-20 text-center">
      <h2 class="text-2xl font-bold">商品不存在</h2>
      <RouterLink to="/" class="mt-4 inline-block text-green-700">返回首页</RouterLink>
    </div>
  </div>
</template>
