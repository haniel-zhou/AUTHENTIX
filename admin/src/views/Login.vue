<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h2>鉴真仓 · 管理后台</h2>
        </div>
      </template>
      <el-form :model="form" @submit.prevent="handleLogin">
        <el-form-item label="管理员密钥">
          <el-input
            v-model="form.key"
            type="password"
            placeholder="请输入管理员密钥"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="hint">
        <el-text type="info">演示模式：任意密钥即可登录</el-text>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const loading = ref(false)
const form = reactive({
  key: ''
})

function handleLogin() {
  if (!form.key) {
    ElMessage.warning('请输入密钥')
    return
  }
  loading.value = true
  // 演示模式：任意密钥均可登录
  setTimeout(() => {
    sessionStorage.setItem('adminLoggedIn', 'true')
    ElMessage.success('登录成功')
    router.push('/')
  }, 500)
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.login-card {
  width: 400px;
}

.card-header h2 {
  text-align: center;
  color: #1a1a2e;
  margin: 0;
}

.hint {
  text-align: center;
  margin-top: 16px;
}
</style>
