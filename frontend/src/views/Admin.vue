<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/products'

const products = ref([])
const loading = ref(true)
const showForm = ref(false)
const editingProduct = ref(null)

// 表单数据
const form = ref({
  name: '',
  brand: '',
  model: '',
  size: '',
  grade: 'A级',
  price: '',
  status: '展示中',
  verify_code: '',
  description: '',
  defects: '',
  is_cleaned: true,
  is_verified: true
})

// 品牌列表
const brands = ['Nike', 'Adidas', 'New Balance', 'Asics', 'Salomon', 'On', 'Puma', 'Reebok', 'Converse', 'Vans', 'Jordan', '其他']
const grades = ['S级', 'A级', 'B级', 'C级']

// 加载商品
async function loadProducts() {
  try {
    products.value = await getProducts()
  } finally {
    loading.value = false
  }
}

loadProducts()

// 打开新增表单
function openAddForm() {
  editingProduct.value = null
  form.value = {
    name: '',
    brand: '',
    model: '',
    size: '',
    grade: 'A级',
    price: '',
    status: '展示中',
    verify_code: 'JZC-2026-' + String(Math.floor(Math.random() * 999999)).padStart(6, '0'),
    description: '',
    defects: '',
    is_cleaned: true,
    is_verified: true
  }
  showForm.value = true
}

// 打开编辑表单
function openEditForm(product) {
  editingProduct.value = product.id
  form.value = {
    name: product.name,
    brand: product.brand,
    model: product.model,
    size: product.size,
    grade: product.grade,
    price: product.price,
    status: product.status,
    verify_code: product.verifyCode,
    description: product.description,
    defects: product.defects ? product.defects.join('、') : '',
    is_cleaned: product.isCleaned,
    is_verified: product.isVerified
  }
  showForm.value = true
}

// 取消
function cancelForm() {
  showForm.value = false
  editingProduct.value = null
}

// 保存到数据库
async function saveProduct() {
  const defectsArray = form.value.defects ? form.value.defects.split('、').filter(d => d.trim()) : []

  try {
    if (editingProduct.value) {
      // 编辑
      await updateProduct(editingProduct.value, {
        name: form.value.name,
        brand: form.value.brand,
        model: form.value.model,
        size: form.value.size,
        grade: form.value.grade,
        price: Number(form.value.price),
        status: form.value.status,
        verify_code: form.value.verify_code,
        description: form.value.description,
        defects: defectsArray,
        is_cleaned: form.value.is_cleaned,
        is_verified: form.value.is_verified
      })
      await loadProducts()
    } else {
      // 新增
      await addProduct({
        name: form.value.name,
        brand: form.value.brand,
        model: form.value.model,
        size: form.value.size,
        grade: form.value.grade,
        price: Number(form.value.price),
        status: form.value.status,
        verify_code: form.value.verify_code,
        description: form.value.description,
        defects: defectsArray,
        is_cleaned: form.value.is_cleaned,
        is_verified: form.value.is_verified,
        images: []
      })
      await loadProducts()
    }
    showForm.value = false
    editingProduct.value = null
    alert('保存成功！')
  } catch (error) {
    alert('保存失败：' + error.message)
  }
}

// 删除
async function handleDelete(id) {
  if (confirm('确定要删除这个商品吗？')) {
    try {
      await deleteProduct(id)
      await loadProducts()
      alert('删除成功！')
    } catch (error) {
      alert('删除失败：' + error.message)
    }
  }
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-8">
    <div class="mb-8 flex items-center justify-between">
      <h1 class="text-3xl font-black">商品管理</h1>
      <RouterLink to="/" class="text-green-700 hover:underline">
        ← 返回首页
      </RouterLink>
    </div>

    <!-- 提示 -->
    <div class="mb-6 rounded-2xl bg-green-50 p-4 text-green-800">
      <p class="font-semibold">数据已保存到云端数据库，刷新页面不会丢失。</p>
    </div>

    <!-- 添加按钮 -->
    <div class="mb-6">
      <button
        @click="openAddForm"
        class="rounded-xl bg-green-700 px-6 py-3 font-bold text-white shadow-lg hover:bg-green-800"
      >
        + 添加商品
      </button>
    </div>

    <!-- 商品列表 -->
    <div v-if="loading" class="text-center text-stone-500">加载中...</div>
    <div v-else class="overflow-x-auto">
      <table class="w-full rounded-2xl bg-[#fffdf6] shadow-lg">
        <thead class="bg-green-100">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-bold text-stone-700">验真编号</th>
            <th class="px-4 py-3 text-left text-sm font-bold text-stone-700">品牌</th>
            <th class="px-4 py-3 text-left text-sm font-bold text-stone-700">型号</th>
            <th class="px-4 py-3 text-left text-sm font-bold text-stone-700">尺码</th>
            <th class="px-4 py-3 text-left text-sm font-bold text-stone-700">成色</th>
            <th class="px-4 py-3 text-left text-sm font-bold text-stone-700">价格</th>
            <th class="px-4 py-3 text-left text-sm font-bold text-stone-700">状态</th>
            <th class="px-4 py-3 text-left text-sm font-bold text-stone-700">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-stone-100">
          <tr v-for="product in products" :key="product.id" class="hover:bg-green-50">
            <td class="px-4 py-3 text-sm">{{ product.verifyCode }}</td>
            <td class="px-4 py-3 text-sm">{{ product.brand }}</td>
            <td class="px-4 py-3 text-sm font-semibold">{{ product.model }}</td>
            <td class="px-4 py-3 text-sm">{{ product.size }}</td>
            <td class="px-4 py-3 text-sm">
              <span :class="{
                'text-green-700': product.grade === 'S级' || product.grade === 'A级',
                'text-amber-700': product.grade === 'B级',
                'text-stone-600': product.grade === 'C级'
              }">{{ product.grade }}</span>
            </td>
            <td class="px-4 py-3 text-sm font-bold text-green-700">¥{{ product.price }}</td>
            <td class="px-4 py-3 text-sm">
              <span :class="{
                'text-green-700': product.status === '展示中',
                'text-stone-500': product.status === '已下架'
              }">{{ product.status }}</span>
            </td>
            <td class="px-4 py-3 text-sm">
              <button
                @click="openEditForm(product)"
                class="mr-2 text-blue-600 hover:underline"
              >
                编辑
              </button>
              <button
                @click="handleDelete(product.id)"
                class="text-red-600 hover:underline"
              >
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 表单弹窗 -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-[#fffdf6] p-6 shadow-2xl">
        <h2 class="mb-6 text-2xl font-black">
          {{ editingProduct ? '编辑商品' : '添加商品' }}
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-stone-700">品牌</label>
            <select v-model="form.brand" class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2">
              <option value="">请选择品牌</option>
              <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-stone-700">型号</label>
            <input v-model="form.model" type="text" class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2" placeholder="如：Air Force 1 Low" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-stone-700">尺码</label>
              <input v-model="form.size" type="text" class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2" placeholder="如：42" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-stone-700">成色</label>
              <select v-model="form.grade" class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2">
                <option v-for="g in grades" :key="g" :value="g">{{ g }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-stone-700">价格</label>
            <input v-model="form.price" type="number" class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2" placeholder="如：399" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-stone-700">验真编号</label>
            <input v-model="form.verify_code" type="text" class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2" />
          </div>

          <div>
            <label class="block text-sm font-semibold text-stone-700">商品描述</label>
            <textarea v-model="form.description" rows="3" class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2"></textarea>
          </div>

          <div>
            <label class="block text-sm font-semibold text-stone-700">瑕疵说明（多个用顿号分隔）</label>
            <input v-model="form.defects" type="text" class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2" placeholder="如：鞋面轻微折痕、鞋底轻微磨损" />
          </div>

          <div class="flex gap-6">
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="form.is_cleaned" class="h-5 w-5 rounded" />
              <span class="text-sm">已清洗</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="form.is_verified" class="h-5 w-5 rounded" />
              <span class="text-sm">已验真</span>
            </label>
          </div>
        </div>

        <div class="mt-6 flex gap-4">
          <button
            @click="saveProduct"
            class="flex-1 rounded-xl bg-green-700 py-3 font-bold text-white hover:bg-green-800"
          >
            保存
          </button>
          <button
            @click="cancelForm"
            class="flex-1 rounded-xl border border-stone-300 py-3 font-bold text-stone-600 hover:bg-stone-100"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>