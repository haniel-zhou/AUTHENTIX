<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px" class="sidebar">
        <div class="logo">
          <h3>鉴真仓</h3>
          <p>管理后台</p>
        </div>
        <el-menu
          :default-active="activeMenu"
          router
          class="sidebar-menu"
        >
          <el-menu-item index="/">
            <span>商品管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="header-left">
            <h2>商品管理</h2>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="goToNew">
              新增商品
            </el-button>
          </div>
        </el-header>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => route.path)

function goToNew() {
  router.push('/products/new')
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.sidebar {
  background-color: #1a1a2e;
  color: #fff;
}

.logo {
  padding: 24px 16px;
  text-align: center;
  border-bottom: 1px solid #2a2a4e;
}

.logo h3 {
  color: #fff;
  margin: 0 0 4px 0;
  font-size: 18px;
}

.logo p {
  color: #888;
  margin: 0;
  font-size: 12px;
}

.sidebar-menu {
  border-right: none;
  background-color: transparent;
}

.sidebar-menu :deep(.el-menu-item) {
  color: #ccc;
}

.sidebar-menu :deep(.el-menu-item:hover),
.sidebar-menu :deep(.el-menu-item.is-active) {
  background-color: #2a2a4e;
  color: #fff;
}

.header {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #eee;
}

.header-left h2 {
  margin: 0;
  font-size: 18px;
  color: #1a1a2e;
}

.main {
  background-color: #f5f5f5;
  padding: 24px;
}
</style>
