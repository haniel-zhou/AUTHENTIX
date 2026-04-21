<template>
  <div class="products">
    <el-card>
      <el-table :data="products" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="商品" min-width="200">
          <template #default="{ row }">
            <div class="product-cell">
              <img :src="row.images[0]" class="product-image" />
              <div>
                <div class="product-name">{{ row.name }}</div>
                <div class="product-brand">{{ row.brand }} · {{ row.model }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="尺码" width="80" />
        <el-table-column prop="grade" label="成色" width="80">
          <template #default="{ row }">
            <el-tag :type="gradeType(row.grade)" size="small">{{ row.grade }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="100">
          <template #default="{ row }">
            <span class="price">¥{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '展示中' ? 'success' : 'info'" size="small">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="verifyCode" label="验真编号" width="150" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getProducts, deleteProduct } from '../api/products'

const router = useRouter()
const products = ref([])

onMounted(() => {
  fetchProducts()
})

async function fetchProducts() {
  try {
    const res = await getProducts()
    products.value = res.data
  } catch (error) {
    ElMessage.error('获取商品列表失败')
  }
}

function gradeType(grade) {
  const map = { 'S级': 'success', 'A级': '', 'B级': 'warning', 'C级': 'danger' }
  return map[grade] || ''
}

function handleEdit(row) {
  router.push(`/products/${row.id}/edit`)
}

async function handleDelete(row) {
  try {
    await ElMessageBox.confirm(`确定删除 "${row.name}" 吗？`, '删除确认', {
      type: 'warning'
    })
    await deleteProduct(row.id)
    ElMessage.success('删除成功')
    fetchProducts()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}
</script>

<style scoped>
.products {
  width: 100%;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.product-name {
  font-weight: 500;
  color: #1a1a2e;
}

.product-brand {
  font-size: 12px;
  color: #888;
}

.price {
  font-weight: 600;
  color: #f56c6c;
}
</style>
