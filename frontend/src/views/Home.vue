<script setup>
import { ref, onMounted } from 'vue'
import { getProducts } from '../api/products'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    products.value = await getProducts()
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center">
      <div>
        <div class="mb-5 inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
          二手正品鞋 · 验真 · 清洗 · 评级
        </div>
        <h1 class="text-5xl font-black leading-tight md:text-6xl">
          鉴真入仓，<br />
          <span class="text-green-700">只卖真鞋。</span>
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-stone-600">
          每双鞋经平台验真、清洗、评级后上架；假货退场，假一罚百万美元。
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#products" class="rounded-2xl bg-green-700 px-6 py-3 font-bold text-white shadow-lg shadow-green-200">
            立即买鞋
          </a>
          <a href="#contact" class="rounded-2xl border border-stone-300 bg-[#fffdf6] px-6 py-3 font-bold text-stone-900">
            我要卖鞋
          </a>
        </div>
      </div>

      <!-- Hero 图片卡片 -->
      <div class="rounded-[2rem] bg-[#fffdf6] p-5 shadow-2xl shadow-green-100">
        <div class="aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-green-100 to-lime-200 p-6">
          <div class="flex h-full flex-col justify-between">
            <div class="flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-green-700 shadow">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              验真编号 #JZC-0001
            </div>
            <div>
              <div class="text-3xl font-black">Nike Air Force 1</div>
              <div class="mt-2 font-medium text-stone-700">A级成色 · 已清洗 · 已验真</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心信任区 -->
    <section class="mx-auto grid max-w-6xl gap-5 px-5 py-8 md:grid-cols-3">
      <div class="rounded-3xl bg-[#fffdf6] p-6 shadow-lg shadow-green-100">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-200">
          <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 class="text-xl font-black">平台验真</h3>
        <p class="mt-2 text-stone-500">每双鞋先验真，再上架。</p>
      </div>

      <div class="rounded-3xl bg-[#fffdf6] p-6 shadow-lg shadow-green-100">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-200">
          <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-black">专业清洗</h3>
        <p class="mt-2 text-stone-500">统一清洗、除味、整理。</p>
      </div>

      <div class="rounded-3xl bg-[#fffdf6] p-6 shadow-lg shadow-green-100">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700 text-white shadow-lg shadow-green-200">
          <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
        <h3 class="text-xl font-black">成色评级</h3>
        <p class="mt-2 text-stone-500">S / A / B / C 级，真实展示瑕疵。</p>
      </div>
    </section>

    <!-- 商品展示区 -->
    <section id="products" class="mx-auto max-w-6xl px-5 py-14">
      <div class="mb-8 flex items-end justify-between">
        <h2 class="text-3xl font-black">精选二手正品鞋</h2>
        <span class="flex items-center gap-1 text-sm font-semibold text-green-700">
          查看更多
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="animate-pulse rounded-3xl bg-[#fffdf6] shadow-lg">
          <div class="aspect-[4/3] bg-gray-200"></div>
          <div class="p-5">
            <div class="h-4 w-20 rounded bg-gray-200"></div>
            <div class="mt-2 h-6 w-32 rounded bg-gray-200"></div>
            <div class="mt-3 h-4 w-16 rounded bg-gray-200"></div>
            <div class="mt-4 h-8 w-20 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>

    <!-- 买卖流程区 -->
    <section class="mx-auto grid max-w-6xl gap-5 px-5 py-12 md:grid-cols-2">
      <div class="rounded-3xl bg-gradient-to-br from-green-700 to-lime-600 p-7 text-white shadow-lg shadow-green-200">
        <h3 class="text-2xl font-black">买鞋流程</h3>
        <p class="mt-4 font-medium">选鞋 → 查看验真档案 → 联系客服 → 转账交易</p>
      </div>
      <div class="rounded-3xl bg-gradient-to-br from-stone-700 to-green-700 p-7 text-white shadow-lg shadow-green-200">
        <h3 class="text-2xl font-black">卖鞋流程</h3>
        <p class="mt-4 font-medium">联系客服 → 平台验真 → 清洗评级 → 上架出售</p>
      </div>
    </section>

    <!-- 信任与规则区 -->
    <section class="mx-auto max-w-6xl px-5 py-14">
      <h2 class="text-3xl font-black">为什么可以放心买？</h2>
      <div class="mt-8 grid gap-5 md:grid-cols-4">
        <div class="rounded-3xl bg-[#fffdf6] p-6 shadow-lg shadow-green-100">
          <svg class="h-7 w-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h3 class="mt-4 text-lg font-black">平台验真</h3>
          <p class="mt-2 text-sm leading-6 text-stone-500">每双鞋经平台审核后上架。</p>
        </div>

        <div class="rounded-3xl bg-[#fffdf6] p-6 shadow-lg shadow-green-100">
          <svg class="h-7 w-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <h3 class="mt-4 text-lg font-black">清洗评级</h3>
          <p class="mt-2 text-sm leading-6 text-stone-500">清洗、除味、成色分级，瑕疵明确展示。</p>
        </div>

        <div class="rounded-3xl bg-[#fffdf6] p-6 shadow-lg shadow-green-100">
          <svg class="h-7 w-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 class="mt-4 text-lg font-black">假货举报</h3>
          <p class="mt-2 text-sm leading-6 text-stone-500">发现疑似假货，可提交复检与售后申请。</p>
        </div>

        <div class="rounded-3xl bg-[#fffdf6] p-6 shadow-lg shadow-green-100">
          <svg class="h-7 w-7 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h3 class="mt-4 text-lg font-black">卖家保证金</h3>
          <p class="mt-2 text-sm leading-6 text-stone-500">卖家需缴纳可退履约保证金。</p>
        </div>
      </div>

      <p class="mt-8 rounded-2xl bg-green-50 p-5 text-sm leading-7 text-stone-600">
        平台会对上架鞋款进行验真、清洗和成色评级。若用户发现疑似假货，可提交复检与售后申请。
      </p>
    </section>
  </div>
</template>
