<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="mx-auto max-w-2xl px-5 py-14 text-center">
    <h1 class="text-3xl font-black md:text-4xl">联系我们</h1>
    <p class="mt-4 text-stone-600">
      有任何问题或购买意向，欢迎联系我们。
    </p>

    <!-- 联系方式卡片 -->
    <div class="mt-10 rounded-3xl bg-[#fffdf6] p-8 shadow-lg shadow-green-100">
      <!-- 微信 -->
      <div class="mb-8">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg class="h-8 w-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.11.24-.245 0-.06-.024-.12-.04-.178l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold">添加微信</h3>
        <p class="mt-2 text-stone-500">请搜索：鉴真仓</p>
        <div class="mt-4 rounded-xl bg-stone-100 px-4 py-2 font-mono text-sm">
          微信号：jianzhengcang888
        </div>
      </div>

      <!-- 分隔线 -->
      <div class="my-8 border-t border-stone-200"></div>

      <!-- 公众号 -->
      <div>
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg class="h-8 w-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold">微信公众号</h3>
        <p class="mt-2 text-stone-500">关注公众号获取最新商品</p>
      </div>
    </div>

    <!-- 返回首页 -->
    <div class="mt-10">
      <RouterLink to="/" class="text-green-700 hover:underline">
        ← 返回首页
      </RouterLink>
    </div>
  </div>
</template>
