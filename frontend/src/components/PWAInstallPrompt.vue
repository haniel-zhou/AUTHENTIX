<script setup>
import { ref, onMounted } from 'vue'

const deferredPrompt = ref(null)
const showInstallButton = ref(false)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    showInstallButton.value = true
  })

  window.addEventListener('appinstalled', () => {
    showInstallButton.value = false
    deferredPrompt.value = null
  })
})

async function installPWA() {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice

  if (outcome === 'accepted') {
    showInstallButton.value = false
  }
  deferredPrompt.value = null
}

function dismiss() {
  showInstallButton.value = false
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="showInstallButton"
      class="fixed bottom-0 left-0 right-0 z-50 bg-[#fffdf6] px-5 py-4 shadow-2xl shadow-green-900/20"
    >
      <div class="mx-auto flex max-w-md items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-700">
            <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-stone-900">添加到桌面</p>
            <p class="text-sm text-stone-500">快速访问，像 App 一样用</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="dismiss"
            class="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-600"
          >
            稍后
          </button>
          <button
            @click="installPWA"
            class="rounded-xl bg-green-700 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-green-200"
          >
            添加
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
